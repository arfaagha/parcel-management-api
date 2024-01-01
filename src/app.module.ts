import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelController } from './parcel/parcel.controller';
import { ParcelService } from './parcel/parcel.service';
import { ParcelModule } from './parcel/parcel.module';

@Module({
  imports: [ParcelModule],
  controllers: [AppController, ParcelController],
  providers: [AppService, ParcelService],
})
export class AppModule {}
