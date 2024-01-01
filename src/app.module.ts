import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelController } from './parcel/parcel.controller';

@Module({
  imports: [],
  controllers: [AppController, ParcelController],
  providers: [AppService],
})
export class AppModule {}
