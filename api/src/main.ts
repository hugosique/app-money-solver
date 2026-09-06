import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerFilter } from './shared/filters/error-handler.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorHandlerFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Money Solver API')
    .setDescription('Documentação da API do Money Solver')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  const config = app.get(ConfigService);
  await app.listen(config.getOrThrow<number>('PORT'));
}

bootstrap();
