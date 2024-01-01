import { Controller, Get, Post } from '@nestjs/common';

@Controller('parcels')
export class ParcelController {
    @Get('sku')
    getBySku(){}

    @Get()
    get(){}

    @Post()
    create(){}
}