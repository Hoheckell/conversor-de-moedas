import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: 'number', nullable: true, required: false })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: 'string', nullable: false, required: true })
  @IsString()
  username: string;

  @ApiProperty({ type: 'string', nullable: false, required: true })
  @IsString()
  password: string;
}
