import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from '../entities/conversion.entity';
import { CreateConversionDto } from '../dto/create-conversion.dto';
import axios from 'axios';
import * as moment from 'moment';
import { UserService } from 'src/modules/user/services';
import { PaginatedListDto } from '../../user/dto/paginated-list.dto';

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

  async convertCurrency(conversion: CreateConversionDto, username: string) {
    const user = await this.userService.findOne(username);
    if (!user?.id) {
      throw new HttpException('User not found', 400);
    }
    let result, response;
    const url = `${process.env.API_CONVERSION_URL}to=${conversion.currencyTo}&from=${conversion.currencyFrom}&amount=${conversion.currencyFromValue}`;
    await axios
      .get(url, {
        headers: {
          apikey: process.env.API_KEY,
        },
      })
      .then(async (r) => {
        if (r?.data?.success) {
          const newConversion: CreateConversionDto = { ...conversion };
          newConversion.quote = r.data.info.quote;
          newConversion.timestamp = moment
            .utc(moment(r.data.info.timestamp))
            .format();
          result = r.data.result;
          newConversion.userId = user.id;
          response = await this.create(newConversion);
        }
      })
      .catch((err) => {
        if (err?.response)
          throw new HttpException(err.response.data, err.response.status);
        throw new Error(err);
      });
    return { ...response, result };
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
}
