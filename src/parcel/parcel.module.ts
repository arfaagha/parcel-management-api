import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';

import { ConfigModule } from '@nestjs/config';
import { DotenvConfigOptions } from 'dotenv';

@Module({
    controllers: [ParcelController],
    providers: [ParcelService]
})
export class ParcelModule {}
