import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "./invoice.entity";

@Entity('invoice_detail')
export class InvoiceDetail {

    @PrimaryGeneratedColumn('increment')
    id : number
    @ManyToOne((type) => Invoice, inv => inv.details)
    @JoinColumn({name : 'invoice_number'})
    invoice : Invoice
    @Column()
    quantity : number
    @Column()
    description : string
    @Column({ type: 'decimal', precision: 6, scale: 2 })
    price : number
    @Column({ type: 'decimal', precision: 6, scale: 2 })
    total : number

}