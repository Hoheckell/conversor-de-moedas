import { Repository } from 'typeorm';
import { Conversion } from '../entities';
import { createMock } from '@golevelup/ts-jest';
import { UserService } from 'src/modules/user/services';
import { ConversorService } from './conversor.service';
import { CreateConversionDto } from '../dto/create-conversion.dto';
import { PaginatedListDto } from 'src/modules/user/dto/paginated-list.dto';

describe('ConversorService', () => {
  const mockedConversionRepository = createMock<Repository<Conversion>>();
  const mockedUserService = createMock<UserService>();
  let conversorService: ConversorService;

  beforeEach(() => {
    conversorService = new ConversorService(
      mockedConversionRepository,
      mockedUserService,
    );
  });

  describe('call create', () => {
    it('should return created conversion', async () => {
      const createConversionDto = new CreateConversionDto();
      const conversion = await conversorService.create(createConversionDto);

      await expect(conversion.id).toBeDefined();
      await expect(conversion.currencyFrom).toBeDefined();
      await expect(conversion.currencyFromValue).toBeDefined();
      await expect(conversion.currencyTo).toBeDefined();
      await expect(conversion.quote).toBeDefined();
      await expect(conversion.timestamp).toBeDefined();
      await expect(mockedConversionRepository.create).toBeCalledTimes(1);
    });
  });

  describe('call converCurrency', () => {
    it('should return created conversion', async () => {
      await expect(mockedConversionRepository.create).toBeCalledTimes(1);
    });
  });

  describe('call lsit', () => {
    it('should return created conversion', async () => {
      const paginate = new PaginatedListDto();
      mockedConversionRepository.find.mockResolvedValue([]);
      await conversorService.list(paginate, 1);
      await expect(mockedConversionRepository.find).toBeCalledTimes(1);
    });
  });
});
