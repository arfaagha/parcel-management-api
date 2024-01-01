import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelController } from './parcel/parcel.controller';
import { ParcelService } from './parcel/parcel.service';
import { ParcelModule } from './parcel/parcel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.local"
    }),
    ParcelModule],
  controllers: [AppController, ParcelController],
  providers: [AppService, ParcelService],
})
export class AppModule {}
