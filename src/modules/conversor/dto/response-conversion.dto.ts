import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class ResponseConversionDto {
  @ApiProperty({
    description: 'Returned id of the register',
    type: 'number',
  })
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'Returned User id that requested',
    type: 'number',
  })
  @IsNumber()
  userId: number;

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
  @IsNumber()
  quote?: number;

  @ApiProperty({ description: 'Returned date of the query', type: 'date' })
  timestamp?: string;
}
