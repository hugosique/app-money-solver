import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ example: '8ad8dc41-942b-4e7f-b241-24d58ed83f9b' })
  id!: string;

  @ApiProperty({ example: 'Jane Doe' })
  name!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;
}
