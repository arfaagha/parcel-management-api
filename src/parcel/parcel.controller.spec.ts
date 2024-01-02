import { Test, TestingModule } from '@nestjs/testing';
import { ParcelController } from './parcel.controller';
import { ParcelDto } from './dto/parcel.dto';
import { ParcelService } from './parcel.service';
import { mockDeep } from 'jest-mock-extended';
import { CustomLogger } from 'src/utils/custom.logger';
import { ParcelRepository } from './parcel.repository';

describe('ParcelController', () => {

  let controller: ParcelController;
  let mockService : ParcelService;
  let logger: CustomLogger = mockDeep<CustomLogger>();

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

  jest.mock('./parcel.service');

  const mockParcelService = {
    create: jest.fn((parcel: ParcelDto) => {
      return Promise.resolve(mockParcelDto);
    }),

    get: jest.fn(({ country: sting, description: string }) => {
      return Promise.resolve(mockParcelDto);
    }),

    getBySku: jest.fn((sku: string) => {
      return Promise.resolve(mockParcelDto);
    }),
    parcelRepo: mockDeep<ParcelRepository>,
    createTracker: function (): string {
      throw new Error('Function not implemented.');
    }
  };
//#endregion
  
beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelController],
      providers: [ParcelService, 
        {
        provide: CustomLogger,
        useValue: logger,
        },
        {
          provide: ParcelService,
          useValue: {
            create: jest.fn(),
            getBySku: jest.fn(),
            get: jest.fn(),
          },
        },
    ],
    }).overrideProvider(ParcelService).useValue(mockParcelService).compile();

    controller = module.get<ParcelController>(ParcelController);
    mockService = module.get<ParcelService>(ParcelService);
    logger = module.get<CustomLogger>(CustomLogger);
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
    expect(controller.get({country: 'mock', description: 'mock'})).not.toBeNull();
  });

  it('should return a parcel with specified SKU',()=>{
    expect(controller.isSkuValid('1111-11111111-1111')).not.toBeNull();
  });

});
