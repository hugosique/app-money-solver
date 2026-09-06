import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';

import { LoginBodyDto } from '../dtos/input/login-body.dto';
import { LoginResponseDto } from '../dtos/output/login-response.dto';
import { USER_REPOSITORY } from 'src/modules/users/domain/repositories/user.repository';
import type { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { ApplicationError } from 'src/shared/errors/application.error';
import { DomainError } from 'src/shared/errors/domain.error';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: LoginBodyDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user || !this.isValidPassword(user, input.password)) {
      throw new ApplicationError(
        'INVALID_CREDENTIALS',
        'Credenciais inválidas',
        401,
      );
    }

    if (!user.canLogin()) {
      throw new ApplicationError(
        'USER_CANNOT_LOGIN',
        'Usuário não pode realizar login',
        403,
      );
    }

    user.login();
    await this.userRepository.save(user);

    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    };

    const accessTokenExpiresIn = this.configService.getOrThrow<string>(
      'auth.accessToken.expiresIn',
    ) as JwtSignOptions['expiresIn'];

    const refreshTokenExpiresIn = this.configService.getOrThrow<string>(
      'auth.refreshToken.expiresIn',
    ) as JwtSignOptions['expiresIn'];

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('auth.accessToken.secret'),
      expiresIn: accessTokenExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('auth.refreshToken.secret'),
      expiresIn: refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      },
    };
  }

  private isValidPassword(
    user: { verifyPassword(password: string): boolean },
    password: string,
  ): boolean {
    try {
      return user.verifyPassword(password);
    } catch (error) {
      if (error instanceof DomainError) {
        return false;
      }

      throw error;
    }
  }
}
