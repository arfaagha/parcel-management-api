import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Parcel } from 'src/parcel/entities/parcel.entity';



@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){}

    //this can all be moved to a environment file as well
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return{
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'testuser',
            database: 'parcel_management',
            synchronize: true,
            autoLoadEntities: true,
            entities: [Parcel],
        }
    }
}
