import { Test, TestingModule } from '@nestjs/testing';
import { ParcelController } from './parcel.controller';
import { ParcelDto } from './dto/parcel.dto';
import { ParcelService } from './parcel.service';
import { Logger } from '@nestjs/common';

describe('ParcelController', () => {

  let controller: ParcelController;
  let mockService : ParcelService;
  let logger: Logger;

  //#region Mocking
  const mockParcelDto: ParcelDto = {
    sku: "1111-11111111-1111", 
    description: "jest mocked description", 
    streetAddress: "la la land", 
    town: "la la land", 
    country: "la la land",
    track: "fak3T7acK3r",
    deliveryDate: new Date()
  };

  const mockParcelService: ParcelService = {
    create: jest.fn((parcel: ParcelDto) => {
      return Promise.resolve(mockParcelDto);
    }),

    get: jest.fn(({ country: sting, description: string }) => {
      return Promise.resolve(mockParcelDto);
    }),

    getBySku: jest.fn((sku: string) => {
      return Promise.resolve(mockParcelDto);
    }),
    logger: jest.fn(),
    parcelRepo: new ParcelRepository,
    createTracker: function (): string {
      throw new Error('Function not implemented.');
    }
  };
//#endregion
  
beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelController],
      providers: [ParcelService, {
        provide: Logger,
        useValue: {
          log: jest.fn(),
        },
      },],
    }).overrideProvider(ParcelService).useValue(mockParcelService).compile();

    controller = module.get<ParcelController>(ParcelController);
    mockService = module.get<ParcelService>(ParcelService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should have a create function', ()=>{
    expect(typeof controller.create).toBe('function');
  });

  it('should have a get function', ()=>{
    expect(typeof controller.get).toBe('function');
  });

  it('should have a getBySku function', ()=>{
    expect(typeof controller.isSkuValid).toBe('function');
  });

  it('should create a parcel and return the newly created parcel',()=>{
    expect(controller.create(mockParcelDto)).not.toBeNull();
  });

  it('should return a list of parcels when get is called',()=>{
    expect(controller.get({})).not.toBeNull();
  });

  it('should return a parcel with specified SKU',()=>{
    expect(controller.isSkuValid('1111-11111111-1111')).not.toBeNull();
  });

});
