import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.set('views', __dirname + '\\views');
  app.useStaticAssets(__dirname + '\\public');
  app.setViewEngine('hbs');
  app.engine("hbs", expressHbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
  }));

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
  Logger.log(`🚀 Application API is running on: http://localhost:${PORT}`);
}
bootstrap();
