import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { ApplicationError } from '../errors/application.error';
import { DomainError } from '../errors/domain.error';
import { ValidationError } from '../errors/validation.error';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof ApplicationError) {
      response.status(error.statusCode).json({
        error: error.code,
        message: error.message,
      });
      return;
    }

    if (error instanceof DomainError) {
      response.status(error.statusCode).json({
        error: error.code,
        message: error.message,
      });
      return;
    }

    if (error instanceof ValidationError) {
      response.status(error.statusCode).json({
        error: error.code,
        message: error.message,
      });
      return;
    }

    if (error instanceof HttpException) {
      response.status(error.getStatus()).json(error.getResponse());
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor',
    });
  }
}
