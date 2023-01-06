import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class PaginatedListDto {
  @ApiProperty({ type: 'number', required: false, default: 0 })
  @IsNumber()
  offset = 0;

  @ApiProperty({ type: 'number', required: false, default: 20 })
  @IsNumber()
  limit = 20;
}
