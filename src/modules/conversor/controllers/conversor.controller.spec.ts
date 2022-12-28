import { ConversorService } from '../services';
import { ConversorController } from './conversor.controller';
import { User } from 'src/modules/user/entities';
import { IAuthMiddlewareUser } from '../../auth/middlewares/auth.middleware';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversion } from '../entities';
import { CreateConversionDto } from '../dto/create-conversion.dto';

describe('ConversorController Unit Tests', () => {
  let controller: ConversorController;
  let service: ConversorService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ConversorService,
      useFactory: () => ({
        conversion: jest.fn(() => []),
        convertCurrency: jest.fn(() => []),
        findOne: jest.fn(() => []),
        create: jest.fn(() => []),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User, Conversion]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'conversor.db',
          entities: [User, Conversion],
          synchronize: true,
        }),
      ],
      controllers: [ConversorController],
      providers: [ConversorService, ApiServiceProvider],
    }).compile();
    controller = app.get<ConversorController>(ConversorController);
    service = app.get<ConversorService>(ConversorService);
  });

  it('define', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('calling conversion method', async () => {
    const dto = new CreateConversionDto();
    const req: IAuthMiddlewareUser = <IAuthMiddlewareUser>(
      (<unknown>{ user: { username: '' } })
    );
    const user = new User();
    user.id = 1;
    await controller.conversion(dto, req);
    await expect(service.convertCurrency).toHaveBeenCalled();
  });
});
