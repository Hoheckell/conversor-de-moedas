import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConversorService } from '../services';
import { CreateConversionDto } from '../dto/create-conversion.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { IAuthMiddlewareUser } from 'src/modules/auth/middlewares/auth.middleware';
import { ResponseConversionDto } from '../dto/response-conversion.dto';

@ApiTags('conversor')
@Controller('conversor')
export class ConversorController {
  constructor(private readonly conversionService: ConversorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ description: 'Currency Conversion' })
  @HttpCode(200)
  @ApiBody({ type: CreateConversionDto, required: true })
  @ApiResponse({
    description: 'Conversion result',
    type: ResponseConversionDto,
  })
  async conversion(
    @Body() conversion: CreateConversionDto,
    @Req() req: IAuthMiddlewareUser,
  ): Promise<ResponseConversionDto> {
    const { username } = req.user;
    return await this.conversionService.convertCurrency(conversion, username);
  }
}
