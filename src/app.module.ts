import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth } from './modules/auth/middlewares/auth.middleware';
import { AuthService } from './modules/auth/services';
import { User } from './modules/user/entities';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/services';
import { JwtService } from '@nestjs/jwt';
import { ConversorModule } from './modules/conversor/conversor.module';
import { Conversion } from './modules/conversor/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'conversor.db',
      entities: [User, Conversion],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ConversorModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(auth)
      .exclude(
        { path: '/user/signin', method: RequestMethod.POST },
        { path: '/user/signup', method: RequestMethod.POST },
        { path: '/health', method: RequestMethod.GET },
        { path: '/routes', method: RequestMethod.GET },
        { path: '/api-docs', method: RequestMethod.GET },
        { path: '/', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
