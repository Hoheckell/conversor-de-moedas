import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class ResponseConversionDto {
  @ApiProperty({
    description: 'Returned id of the register',
    type: 'number',
    required: true,
  })
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'Returned User id that requested',
    type: 'number',
    required: true,
  })
  @IsNumber()
  userId: number;

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
    required: true,
  })
  @IsNumber()
  quote: number;

  @ApiProperty({
    description: 'Returned date of the query',
    type: 'string',
    required: true,
  })
  timestamp: string;
}
