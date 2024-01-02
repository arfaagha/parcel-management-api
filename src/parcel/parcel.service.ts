import { Injectable, Logger } from "@nestjs/common";
import { ParcelDto } from "./dto/parcel.dto";
import { Parcel } from "./entities/parcel.entity";
import { ParcelRepository } from "./parcel.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { filterDto } from "./dto/filter.dto";

@Injectable()
export class ParcelService {
    private readonly logger = new Logger(ParcelService.name);
    
    constructor(@InjectRepository(Parcel) private parcelRepo : ParcelRepository){}


    async get(filter: filterDto): Promise<ParcelDto| ParcelDto[] | null>{
       
        this.logger.log('inside get call');

        // TypeORM does not support unions
        // We therefore use CTE to create our own query
        // more on: https://typeorm.io/select-query-builder#common-table-expressions

        const result= await this.parcelRepo.createQueryBuilder('parcel').orderBy('parcel.deliveryDate', 'ASC').getMany();
        
        if(result) return ParcelDto.fromEntity(result);

        return null;
    }

    async create(parcel: ParcelDto): Promise<ParcelDto| ParcelDto[] | null>{
        
        this.logger.log('inside create call');

        const newParcel = {track: this.createTracker(), ...parcel};

        return ParcelDto.fromEntity(await this.parcelRepo.save(this.parcelRepo.create(newParcel)));
    }

    createTracker(): string {
        let timeNow: number = new Date().getTime();

        // Map to store 62 possible characters 
        let map = "abcdefghijklmnopqrstuvwxyzABCDEF"
        "GHIJKLMNOPQRSTUVWXYZ0123456789"; 

        let shorturl = []; 

        // Convert given integer id to a base 62 number 
        while (timeNow) 
        { 
            // use above map to store actual character in short url 
            shorturl.push(map[timeNow % 62]); 
            timeNow = Math.floor(timeNow / 62); 
        } 

        // Reverse shortURL to complete base conversion 
        shorturl.reverse(); 

        return shorturl.join(""); 
    }
    
    async getBySku(sku: string): Promise<ParcelDto | ParcelDto[] | null>{
        
        this.logger.log('inside getBySku call');
        const result = await this.parcelRepo.createQueryBuilder('parcel').where('parcel.sku = :sku', { sku }).getOne();
        if(result){
            return ParcelDto.fromEntity(result);
        }
        return null;
    }
}