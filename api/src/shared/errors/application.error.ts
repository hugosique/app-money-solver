// application/errors/ApplicationError.ts
export class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = 'Recurso não encontrado') {
    super('NOT_FOUND', message, 404);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string = 'Recurso já existe') {
    super('CONFLICT', message, 409);
  }
}
