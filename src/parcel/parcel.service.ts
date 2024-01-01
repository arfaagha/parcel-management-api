import { Injectable } from "@nestjs/common";
import { ParcelDto } from "./dto/parcel.dto";

@Injectable()
export class ParcelService {

    get(){}

    create(parcel: ParcelDto){}
    
    getBySku(sku: string){}
}