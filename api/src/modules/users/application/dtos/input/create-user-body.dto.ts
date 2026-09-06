import { ApiProperty } from '@nestjs/swagger';

// Enum
import { UserRole } from 'src/modules/users/domain/enums/user-role.enum';

export class CreateUserBodyDto {
  @ApiProperty({ example: 'Jane Doe' })
  name!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'Password123' })
  password!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role!: UserRole;
}
