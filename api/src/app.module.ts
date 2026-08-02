import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import configuration from './shared/config/configuration';
import { envValidationSchema } from './shared/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: envValidationSchema
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
