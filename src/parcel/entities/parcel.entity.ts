import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class Parcel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true, 
        length:20,
        type: "varchar",
        nullable: false
    })
    sku: string;

    @Column({
        length:120,
        type: "varchar",
        nullable: false
    })
    description: string;

    @Column({
        name: "street",
        length:50,
        type: "varchar",
        nullable: false
    })
    streetAddress: string;

    @Column({
        length:40,
        type: "varchar",
        nullable: false
    })
    town: string;

    @Column({
        length:40,
        type: "varchar",
        nullable: false
    })
    country: string;

    @Column({
        nullable: false
    })
    deliveryDate: Date;

    @Column({
        unique: true,
        length:20,
        type: "varchar",
       nullable: false
    })
    track: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatededOn: Date
}