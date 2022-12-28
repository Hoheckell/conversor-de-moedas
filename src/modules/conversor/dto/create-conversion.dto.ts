import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateConversionDto {
  @ApiProperty()
  @Optional()
  userId?: number;

  @ApiProperty()
  @IsString()
  currencyFrom: string;

  @ApiProperty()
  @IsNumber()
  currencyFromValue: number;

  @ApiProperty()
  @IsString()
  currencyTo: string;

  @ApiProperty()
  @Optional()
  quote?: any;

  @ApiProperty()
  @Optional()
  timestamp?: string;
}
