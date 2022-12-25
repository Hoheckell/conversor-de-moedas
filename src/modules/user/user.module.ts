import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { User } from './entities';
import { UserService } from './services';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}
