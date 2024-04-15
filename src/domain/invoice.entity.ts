import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Passenger} from "./passenger.entity";
import {InvoiceDetail} from "./invoice.detail.entity";

@Entity('invoice')
export class Invoice {

    @PrimaryGeneratedColumn('increment')
    number : number
    @Column({name:'date', type:"date"})
    date: Date
    @ManyToOne((type) => Passenger, pass => pass.trips, {cascade : true})
    @JoinColumn({name : 'passenger_id'})
    passenger : Passenger
    @Column()
    active : boolean
    @OneToMany((type) => InvoiceDetail, invd => invd.invoice,
        {cascade: ['insert', 'update', 'remove']}
        )
    details : InvoiceDetail[]
    @Column()
    subtotal : number
    @Column({ type: 'decimal', precision: 6, scale: 2 })
    tax : number
    @Column({ type: 'decimal', precision: 6, scale: 2 })
    total : number

}