import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'E-mail cadastrado do usuário.',
  })
  email!: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Senha do usuário.',
  })
  password!: string;
}
