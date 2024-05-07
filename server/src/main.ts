import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const expressApp = await NestFactory.create<NestExpressApplication>(AppModule); app可使用express的方法
  await app.listen(3000);
}
bootstrap();
