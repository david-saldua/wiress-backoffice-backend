import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  registerGlobals(app);
  await app.listen(3001);
}

export function registerGlobals(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
}

// TODO:
/**
 * 1. NestJs Passport authentication
 *
 */

bootstrap();
