import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ nullable: true })
  id?: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
