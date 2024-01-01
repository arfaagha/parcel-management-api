import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelDto } from './dto/parcel.dto';

@Controller('parcels')
export class ParcelController {
    constructor(private service: ParcelService){

    }

    @Get('sku')
    getBySku(sku: string){
        this.service.getBySku(sku);
    }

    @Get()
    get(){
        this.service.get();
    }

    @Post()
    create(@Body() form: ParcelDto){
        this.service.create(form);
    }
}