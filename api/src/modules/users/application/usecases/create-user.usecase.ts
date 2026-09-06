// Repository
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';
// Dto
import { CreateUserBodyDto } from '../dtos/input/create-user-body.dto';
import { CreateUserResponseDto } from '../dtos/output/create-user-response.dto';
// Error
import { ApplicationError, ConflictError } from 'src/shared/errors/application.error';
// Entity
import { User } from 'src/modules/users/domain/entities/user.entity';
import { DomainError } from 'src/shared/errors/domain.error';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserBodyDto): Promise<CreateUserResponseDto> {
    try {
      const existingUser = await this.userRepository.findByEmail(input.email);

      if (existingUser) {
        throw new ConflictError('Email já cadastrado');
      }

      // Cria entidade (pode lançar DomainError)
      const user = User.create(
        input.name,
        input.email,
        input.password,
        input.role,
      );

      // Salva no repositório
      await this.userRepository.save(user);

      return {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      };
    } catch (error) {
      // Converte DomainError para ApplicationError se necessário
      if (error instanceof DomainError) {
        throw new ApplicationError(error.code, error.message, error.statusCode);
      }

      // Relança erros já tratados
      if (error instanceof ApplicationError) {
        throw error;
      }

      // Erros inesperados
      console.error('Erro inesperado:', error);
      throw new ApplicationError(
        'INTERNAL_ERROR',
        'Erro interno do servidor',
        500,
      );
    }
  }
}
