import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(__dirname + '..' + 'public');
  app.setBaseViewsDir(__dirname + '..' + 'views');
  app.setViewEngine('hbs');

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  Logger.log(`🚀 Application API is running on: http://localhost:${PORT}`);
}
bootstrap();
