import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateConversionDto {
  @ApiProperty()
  @Optional()
  userId?: number;

  @ApiProperty({
    description: 'Currency BRL | USD | EUR | JPY',
    type: 'string',
  })
  @IsString()
  currencyFrom: string;

  @ApiProperty({
    description: 'Original amount for conversion',
    type: 'number',
  })
  @IsNumber()
  currencyFromValue: number;

  @ApiProperty({
    description: 'Currency BRL | USD | EUR | JPY',
    type: 'string',
  })
  @IsString()
  currencyTo: string;

  @ApiProperty({
    description: 'Returned value on destination currency',
    type: 'number',
  })
  @Optional()
  quote?: any;

  @ApiProperty({ description: 'Returned date of the query', type: 'date' })
  @Optional()
  timestamp?: string;
}
