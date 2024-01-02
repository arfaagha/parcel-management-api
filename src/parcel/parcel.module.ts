import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';

import { AppModule } from 'src/app.module';

@Module({
    imports: [AppModule],
    controllers: [ParcelController],
    providers: [ParcelService]
})
export class ParcelModule {}
