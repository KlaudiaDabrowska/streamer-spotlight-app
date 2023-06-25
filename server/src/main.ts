import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { StreamersModule } from './streamers/streamers.module';

async function bootstrap() {
  const app = await NestFactory.create(StreamersModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3001);
}
bootstrap();
