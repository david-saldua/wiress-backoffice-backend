import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbURL } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';

if (!mongoDbURL) {
  throw new Error('Environment variable MONGODB_URL is not defined');
}

@Module({
  imports: [MongooseModule.forRoot(mongoDbURL), AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
