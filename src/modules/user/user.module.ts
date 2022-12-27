import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { User } from './entities';
import { UserService } from './services';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services';
import { ConversorService } from '../conversor/services';
import { Conversion } from '../conversor/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Conversion])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, ConversorService],
})
export class UserModule {}
