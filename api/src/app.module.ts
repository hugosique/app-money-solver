import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import configuration from './shared/config/configuration';
import { envValidationSchema } from './shared/config/env.validation';
import { PrismaModule } from './infra/database/prisma.module';
import { HealthModule } from './infra/http/health.module';
import { UserModule } from './modules/users/infra/http/user.module';
import { AuthModule } from './modules/auth/infra/http/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    HealthModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
