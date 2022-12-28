export class ResponseConversionDto {
  id: number;
  userId: number;
  currencyFrom: string;
  currencyFromValue: number;
  currencyTo: string;
  quote: number;
  timestamp: Date;
  result: number;
}
