import { Parcel } from "../entities/parcel.entity"

export class ParcelDto{
    sku: string
    description: string
    streetAddress: string
    town: string
    country: string
    deliveryDate: Date
    track: string

    static fromEntity(entity: Parcel| Parcel[]): ParcelDto| ParcelDto[]{
        if (Array.isArray(entity)) {
            const models: ParcelDto[] = []
            for (let item of entity) {
                models.push(this._from(item))
            }
            return models
        }
        return this._from(entity);
    }

    private static _from(entity: Parcel): ParcelDto{
        let dto = {
            sku: entity.sku,
            description: entity.description,
            streetAddress: entity.streetAddress,
            town: entity.town,
            country: entity.country,
            deliveryDate: entity.deliveryDate,
            track: entity.track
        }
        return dto;
    }
}