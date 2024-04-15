import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Trip} from "./trip.entity";
import {Invoice} from "./invoice.entity";

@Entity('passenger')
export class Passenger {

    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({name: 'dni'})
    dni: string
    @Column({name: 'full_name'})
    fullName: string
    @Column({name:'direccion'})
    address : string
    @Column({name:'phone'})
    phone : string
    @OneToMany((type) => Trip, trip => trip.passenger)
    trips : Trip[]
    @OneToMany((type) => Invoice, inv => inv.passenger)
    invoices : Invoice[]

    setId(id : number) : void {
        this.id = id;
    }
}