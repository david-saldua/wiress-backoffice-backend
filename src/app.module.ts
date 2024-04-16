import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbURL } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import pino from 'pino';
import { LoggerModule } from 'nestjs-pino';

if (!mongoDbURL) {
  throw new Error('Environment variable MONGODB_URL is not defined');
}

const isDevelopment = process.env.ENVIRONMENT === 'development';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbURL),
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: isDevelopment
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'SYS:standard',
                messageFormat: '{timestamp} [{context}]: {msg}',
              },
            }
          : {
              target: 'pino-pretty',
              options: {
                colorize: false,
                levelFirst: true,
                translateTime: 'SYS:standard',
                messageFormat: '{timestamp} [{context}]: {msg}',
              },
            },
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
            headers: req.headers,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
            headers: res.headers,
            responseTime: res.responseTime,
          }),
        },
        level: isDevelopment ? 'debug' : 'info',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
