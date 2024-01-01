import { Repository } from 'typeorm';
import { CustomRepository } from 'src/custom-repository/typeorm-ex.decorator';
import { Parcel } from './entities/parcel.entity';

@CustomRepository(Parcel)
export class ParcelRepository extends Repository<Parcel> {}