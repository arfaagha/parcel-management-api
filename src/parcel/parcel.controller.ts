import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelDto } from './dto/parcel.dto';

@Controller('parcels')
export class ParcelController {

    constructor(private readonly parcelService: ParcelService){
    }

    @Get(':sku')
    async isSkuValid(@Param('sku') sku: string){

    const isSkuExist = await this.parcelService.getBySku(sku);
    
    //check if the sku exists
    // return false which means the sku is already taken
    if (Array.isArray(isSkuExist) && isSkuExist.length>0) return false;
    if (isSkuExist) return false;

    // return true because the sku does not exist in our system
    return true;
    }

    @Get()
    get(@Query() filter: any){
        return this.parcelService.get();
    }

    @Post()
    create(@Body() form: ParcelDto){
        return this.parcelService.create(form);
    }
}
