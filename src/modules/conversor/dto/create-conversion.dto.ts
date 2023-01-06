import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateConversionDto {
  @ApiProperty({ required: false, type: 'number' })
  @Optional()
  userId?: number;

  @ApiProperty({
    description: 'Currency BRL | USD | EUR | JPY',
    type: 'string',
    required: true,
  })
  @IsString()
  currencyFrom: string;

  @ApiProperty({
    description: 'Original amount for conversion',
    type: 'number',
    required: true,
  })
  @IsNumber()
  currencyFromValue: number;

  @ApiProperty({
    description: 'Currency BRL | USD | EUR | JPY',
    type: 'string',
    required: true,
  })
  @IsString()
  currencyTo: string;

  @ApiProperty({
    description: 'Returned value on destination currency',
    type: 'number',
    required: false,
  })
  @Optional()
  quote?: any;

  @ApiProperty({
    description: 'Returned date of the query',
    type: 'date',
    required: false,
  })
  @Optional()
  timestamp?: string;
}
