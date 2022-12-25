import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/modules/auth/dto/auth-login.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Signin, get jwt' })
  @HttpCode(200)
  @ApiBody({ type: UserDto, required: true })
  @ApiResponse({ description: 'Bearer Token' })
  @Post('signup')
  async signup(@Body() userdto: UserDto) {
    return await this.userService.signup(userdto);
  }

  @ApiOperation({ description: 'Signin, get jwt' })
  @HttpCode(200)
  @ApiBody({ type: AuthLoginDto, required: true })
  @ApiResponse({ description: 'Bearer Token' })
  @Post('signin')
  async login(@Body() login: AuthLoginDto) {
    return await this.authService.login(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.userService.show(id);
  }
}
