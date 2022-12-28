import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from '../entities/conversion.entity';
import { CreateConversionDto } from '../dto/create-conversion.dto';
import axios from 'axios';
import * as moment from 'moment';
import { PaginatedListDto } from '../../user/dto/paginated-list.dto';
import { Currencies } from '../allowed-currencies';
import { ResponseConversionDto } from '../dto/response-conversion.dto';
import { UserService } from 'src/modules/user/services';
import { User } from 'src/modules/user/entities';

@Injectable()
export class ConversorService {
  constructor(
    @InjectRepository(Conversion)
    private conversionRepository: Repository<Conversion>,
    private readonly userService: UserService,
  ) {}

  async create(conversion: CreateConversionDto): Promise<Conversion> {
    const newConversion: Conversion =
      this.conversionRepository.create(conversion);
    return await this.conversionRepository.save(newConversion);
  }

  async convertCurrency(
    conversion: CreateConversionDto,
    username: string,
  ): Promise<ResponseConversionDto> {
    const user = await this.userService.findOne(username);
    if (!user?.id) {
      throw new HttpException('User not found', 400);
    }
    if (
      !Currencies.includes(conversion.currencyTo) ||
      !Currencies.includes(conversion.currencyFrom)
    ) {
      throw new HttpException('Currency not allowed', 400);
    }
    return await this.callService(conversion, user);
  }

  async list(
    paginate: PaginatedListDto,
    userId: number,
  ): Promise<Conversion[]> {
    return await this.conversionRepository.find({
      where: { userId: userId },
      take: paginate.limit,
      skip: paginate.offset,
    });
  }

  async callService(
    conversion: CreateConversionDto,
    user: User,
  ): Promise<ResponseConversionDto> {
    let result, response;
    const url = `${process.env.API_CONVERSION_URL}to=${conversion.currencyTo}&from=${conversion.currencyFrom}&amount=${conversion.currencyFromValue}`;
    const options = { headers: { apikey: process.env.API_KEY } };
    try {
      const { data } = await axios.get(url, options);
      if (data) {
        const newConversion: CreateConversionDto = { ...conversion };
        newConversion.quote = data.info.quote;
        newConversion.timestamp = moment
          .utc(moment.unix(data.info.timestamp).local().format())
          .format();
        result = data.result;
        newConversion.userId = user.id;
        response = await this.create(newConversion);
      }
      return { ...response, result };
    } catch (e) {
      if (e?.response)
        throw new HttpException(e.response.data, e.response.status);
      throw new Error(e);
    }
  }
}
