import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Conversor de Moedas')
    .setDescription('The conversor API description')
    .setVersion('1.0')
    .addTag('conversor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.SWAGGER_ROUTE}`, app, document);
  await app.listen(process.env.APP_PORT);
  console.log(`Conversor de moedas Listening ${process.env.APP_PORT}`);
}
bootstrap();
