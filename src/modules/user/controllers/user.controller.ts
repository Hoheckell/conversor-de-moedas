import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthLoginDto } from 'src/modules/auth/dto/auth-login.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services';
import { PaginatedListDto } from '../dto/paginated-list.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services';
import { Conversion } from '../../conversor/entities/conversion.entity';
import { ConversorService } from '../../conversor/services/conversor.service';
import { User } from '../entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly conversorService: ConversorService,
  ) {}

  @ApiOperation({ description: 'Signup, create an user' })
  @HttpCode(200)
  @ApiBody({ type: UserDto, required: true })
  @ApiResponse({ description: 'Create an user', type: User })
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'list users' })
  @HttpCode(200)
  @ApiQuery({ type: PaginatedListDto, required: false })
  @ApiResponse({ description: 'List of Users' })
  @Get()
  async list(@Query() paginate: PaginatedListDto): Promise<UserDto[]> {
    return await this.userService.list(paginate);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: `list user's tansactions` })
  @HttpCode(200)
  @ApiQuery({ type: PaginatedListDto, required: false })
  @ApiResponse({ description: 'List of Transactions from user' })
  @Get('transactions/:userid')
  async transactions(
    @Query() paginate: PaginatedListDto,
    @Param('userid') userId: number,
  ): Promise<Conversion[]> {
    return await this.conversorService.list(paginate, userId);
  }
}
