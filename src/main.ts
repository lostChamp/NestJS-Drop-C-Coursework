import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  Logger.log(`🚀 Application API is running on: http://localhost:${PORT}`);
}
bootstrap();
