import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelController } from './parcel/parcel.controller';
import { ParcelService } from './parcel/parcel.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresConfigService } from './config/database/config.service';
import { Parcel } from './parcel/entities/parcel.entity';
import { ParcelRepository } from './parcel/parcel.repository';
import { TypeOrmExModule } from './custom-repository/typeorm-ex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.local"
    }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([Parcel]),
    TypeOrmExModule.forCustomRepository([ParcelRepository]),],
  controllers: [AppController, ParcelController],
  providers: [AppService, ParcelService],
})
export class AppModule {}
