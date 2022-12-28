import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  currencyFrom: string;

  @Column()
  currencyFromValue: number;

  @Column()
  currencyTo: string;

  @Column()
  quote: number;

  @Column()
  timestamp: Date;
}
