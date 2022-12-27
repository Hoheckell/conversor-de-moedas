import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Currency } from '../enums/currence';

export class CreateConversionDto {
  @ApiProperty()
  @Optional()
  userId?: number;

  @ApiProperty()
  @IsString()
  currencyFrom: Currency;

  @ApiProperty()
  @IsNumber()
  currencyFromValue: number;

  @ApiProperty()
  @IsString()
  currencyTo: Currency;

  @ApiProperty()
  @Optional()
  quote?: any;

  @ApiProperty()
  @Optional()
  timestamp?: string;
}
