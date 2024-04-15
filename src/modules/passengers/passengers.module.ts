import { Module } from '@nestjs/common';

import {TypeOrmModule} from "@nestjs/typeorm";;
import {Passenger} from "../../domain/passenger.entity";
import {Invoice} from "../../domain/invoice.entity";
import {InvoiceDetail} from "../../domain/invoice.detail.entity";

@Module({
    imports : [
        TypeOrmModule.forFeature([Passenger]),
        TypeOrmModule.forFeature([Invoice]),
        TypeOrmModule.forFeature([InvoiceDetail])
    ]
})
export class PassengersModule {}
