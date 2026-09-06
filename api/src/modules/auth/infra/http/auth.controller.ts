import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginBodyDto } from 'src/modules/auth/application/dtos/input/login-body.dto';
import { LoginResponseDto } from 'src/modules/auth/application/dtos/output/login-response.dto';
import { LoginUseCase } from 'src/modules/auth/application/usecases/login.usecase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza login do usuário' })
  @ApiOkResponse({
    description: 'Login realizado com sucesso.',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  async login(@Body() body: LoginBodyDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(body);
  }
}
