import { Injectable } from '@nestjs/common';

import { User } from 'src/modules/users/domain/entities/user.entity';
import { UserRole } from 'src/modules/users/domain/enums/user-role.enum';
import { UserStatus } from 'src/modules/users/domain/enums/user-status.enum';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { PrismaService } from '../../../../infra/database/prisma.service';

type UserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  preferences: unknown;
};

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.prisma.$queryRaw<UserRow[]>`
      SELECT
        id,
        name,
        email,
        password,
        role,
        status,
        "createdAt",
        "updatedAt",
        "lastLogin",
        preferences
      FROM users
      WHERE email = ${email.toLowerCase()}
      LIMIT 1
    `;

    if (!user) {
      return null;
    }

    return User.restore({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      preferences: this.toPreferences(user.preferences),
    });
  }

  async save(user: User): Promise<void> {
    const preferences = JSON.stringify(user.toJSON().preferences);

    await this.prisma.$executeRaw`
      INSERT INTO users (
        id,
        name,
        email,
        password,
        role,
        status,
        "createdAt",
        "updatedAt",
        "lastLogin",
        preferences
      )
      VALUES (
        ${user.getId()},
        ${user.getName()},
        ${user.getEmail().toLowerCase()},
        ${user.getPassword()},
        ${user.getRole()}::"UserRole",
        ${user.getStatus()}::"UserStatus",
        ${user.getCreatedAt()},
        ${user.getUpdatedAt()},
        ${user.getLastLogin() ?? null},
        ${preferences}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        status = EXCLUDED.status,
        "updatedAt" = EXCLUDED."updatedAt",
        "lastLogin" = EXCLUDED."lastLogin",
        preferences = EXCLUDED.preferences
    `;
  }

  private toPreferences(value: unknown): Record<string, any> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    return value as Record<string, any>;
  }
}
