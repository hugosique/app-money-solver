import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserBodyDto } from 'src/modules/users/application/dtos/input/create-user-body.dto';
import { CreateUserResponseDto } from 'src/modules/users/application/dtos/output/create-user-response.dto';
import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso.',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiConflictResponse({ description: 'E-mail já cadastrado.' })
  async create(
    @Body() body: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    return this.createUserUseCase.execute(body);
  }
}
