import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/services';
import { User } from '../../user/entities/user.entity';
import { AuthLoginDto } from '../dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return false;
  }

  async login(user: AuthLoginDto) {
    const loggerUser = await this.validateUser(user.username, user.password);
    if (loggerUser) {
      const payload = { username: loggerUser.username, sub: loggerUser.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } else {
      throw new HttpException('Access Denied', 403);
    }
  }
}
