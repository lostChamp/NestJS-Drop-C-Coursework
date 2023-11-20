import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';
import {join} from 'path';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
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
