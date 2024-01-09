import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Parcel } from 'src/parcel/entities/parcel.entity';



@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){
    }

    createTypeOrmOptions(): TypeOrmModuleOptions{
        return{
            type: 'postgres',
            host: this.configService.get<string>('HOST'),
            port: this.configService.get<number>('PORT'),
            username: this.configService.get<string>('USER_NAME'),
            password: this.configService.get<string>('PASSWORD'),
            database: this.configService.get<string>('DATABASE'),
            synchronize: true,
            autoLoadEntities: true,
            entities: [Parcel],
        }
    }
}
