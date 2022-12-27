import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Currency } from '../enums/currence';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  currencyFrom: Currency;

  @Column()
  currencyFromValue: number;

  @Column()
  currencyTo: Currency;

  @Column()
  quote: number;

  @Column()
  timestamp: Date;
}
