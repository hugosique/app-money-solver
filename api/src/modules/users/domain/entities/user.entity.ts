// domain/entities/User.ts
import { DomainError } from 'src/shared/errors/domain.error';
// Value Object
import { Email } from 'src/shared/value-objects/email';
import { Password } from 'src/shared/value-objects/password';
import { v4 as uuidv4 } from 'uuid';
// Enum
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export class User {
  private readonly id: string;
  private name: string;
  private email: Email;
  private password: Password;
  private role: UserRole;
  private status: UserStatus;
  private createdAt: Date;
  private updatedAt: Date;
  private lastLogin?: Date;
  private preferences: Map<string, any>;

  private constructor(
    id: string,
    name: string,
    email: Email,
    password: Password,
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.ACTIVE,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.preferences = new Map<string, any>();
  }

  // Factory method
  static create(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): User {
    const id = uuidv4();
    const emailVO = new Email(email);
    const passwordVO = new Password(password);

    return new User(id, name.trim(), emailVO, passwordVO, role);
  }

  static restore(params: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date | null;
    preferences?: Record<string, any> | null;
  }): User {
    const user = new User(
      params.id,
      params.name,
      new Email(params.email),
      new Password(params.password),
      params.role,
      params.status,
    );

    user.createdAt = params.createdAt;
    user.updatedAt = params.updatedAt;
    user.lastLogin = params.lastLogin ?? undefined;
    user.preferences = new Map(Object.entries(params.preferences ?? {}));

    return user;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword(): string {
    return this.password.getValue();
  }

  getRole(): UserRole {
    return this.role;
  }

  getStatus(): UserStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getLastLogin(): Date | undefined {
    return this.lastLogin;
  }

  // Business methods
  updateName(newName: string): void {
    if (!newName || newName.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    this.name = newName.trim();
    this.updatedAt = new Date();
  }

  updateEmail(newEmail: string): void {
    const emailVO = new Email(newEmail);
    if (this.email.equals(emailVO)) {
      throw new Error('New email must be different from current email');
    }
    this.email = emailVO;
    this.updatedAt = new Date();
  }

  updatePassword(newPassword: string): void {
    const passwordVO = new Password(newPassword);
    this.password = passwordVO;
    this.updatedAt = new Date();
  }

  login(): void {
    this.lastLogin = new Date();
    this.updatedAt = new Date();
  }

  activate(): void {
    if (this.status === UserStatus.DELETED) {
      throw new Error('Cannot activate a deleted user');
    }
    this.status = UserStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    if (this.status === UserStatus.DELETED) {
      throw new Error('Cannot deactivate a deleted user');
    }
    this.status = UserStatus.INACTIVE;
    this.updatedAt = new Date();
  }

  suspend(): void {
    if (this.status === UserStatus.DELETED) {
      throw new Error('Cannot suspend a deleted user');
    }
    this.status = UserStatus.SUSPENDED;
    this.updatedAt = new Date();
  }

  delete(): void {
    this.status = UserStatus.DELETED;
    this.updatedAt = new Date();
  }

  changeRole(newRole: UserRole): void {
    if (this.role === newRole) {
      throw new Error('New role must be different from current role');
    }
    this.role = newRole;
    this.updatedAt = new Date();
  }

  setPreference(key: string, value: any): void {
    this.preferences.set(key, value);
    this.updatedAt = new Date();
  }

  getPreference(key: string): any {
    return this.preferences.get(key);
  }

  // Verification methods
  verifyPassword(password: string): boolean {
    // In real application, use bcrypt or similar
    return this.password.equals(new Password(password));
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  canLogin(): boolean {
    return (
      this.status === UserStatus.ACTIVE || this.status === UserStatus.INACTIVE
    );
  }

  // Domain event methods
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      email: this.email.getValue(),
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin,
      preferences: Object.fromEntries(this.preferences),
    };
  }
}
