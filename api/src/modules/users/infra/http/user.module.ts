import { Module } from '@nestjs/common';

import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { USER_REPOSITORY } from 'src/modules/users/domain/repositories/user.repository';
import { PrismaUserRepository } from 'src/modules/users/infra/repositories/prisma-user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
