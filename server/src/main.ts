// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyODataServer } from './odata/odata.server';
import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  })

  app.use('/odata', MyODataServer.create());

  await app.listen(3000);
  console.log('NestJS running at http://localhost:3000');
}
bootstrap();
