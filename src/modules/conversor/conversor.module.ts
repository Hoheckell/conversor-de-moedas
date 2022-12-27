import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConversorController } from './controllers/conversor.controller';
import { Conversion } from './entities';
import { ConversorService } from './services/conversor.service';
import { UserService } from '../user/services';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion, User])],
  controllers: [ConversorController],
  providers: [ConversorService, JwtService, UserService],
})
export class ConversorModule {}
