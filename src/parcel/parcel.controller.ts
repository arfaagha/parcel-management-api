import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelDto } from './dto/parcel.dto';

@Controller('parcels')
export class ParcelController {

    constructor(private readonly parcelService: ParcelService){
    }

    @Get('sku')
   getBySku(@Param('sku') sku: string){
        return this.parcelService.getBySku(sku);
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
