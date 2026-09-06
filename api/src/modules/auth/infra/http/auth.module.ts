import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LoginUseCase } from 'src/modules/auth/application/usecases/login.usecase';
import { USER_REPOSITORY } from 'src/modules/users/domain/repositories/user.repository';
import { PrismaUserRepository } from 'src/modules/users/infra/repositories/prisma-user.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
