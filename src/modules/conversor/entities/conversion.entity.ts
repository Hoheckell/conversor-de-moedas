import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false })
  userId: number;

  @Column({ type: 'string', nullable: false })
  currencyFrom: string;

  @Column({ type: 'decimal', nullable: false })
  currencyFromValue: number;

  @Column({ type: 'string', nullable: false })
  currencyTo: string;

  @Column({ type: 'decimal', nullable: false })
  quote: number;

  @Column({ type: 'date', nullable: false })
  timestamp: Date;
}
