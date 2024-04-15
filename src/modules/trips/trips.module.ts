import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Trip} from "../../domain/trip.entity";
import { TripsCreateService } from './application/usecase/trips-create.service';
import {TripsController} from "./adapter/controller/trips.controller";
import {Driver} from "../../domain/driver.entity";
import {Passenger} from "../../domain/passenger.entity";
import {Invoice} from "../../domain/invoice.entity";
import {InvoiceDetail} from "../../domain/invoice.detail.entity";
import {TripsFinishService} from "./application/usecase/trips-finish.service";
import {TripsQueryService} from "./application/usecase/trips-query.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([Trip]),
        TypeOrmModule.forFeature([Driver]),
        TypeOrmModule.forFeature([Passenger]),
        TypeOrmModule.forFeature([Invoice]),
        TypeOrmModule.forFeature([InvoiceDetail])
    ],
    controllers: [TripsController],
    providers: [
        {provide : 'TripsCreateCommand', useClass : TripsCreateService},
        {provide : 'TripsFinishCommand', useClass : TripsFinishService},
        {provide : 'TripsActiveQuery', useClass : TripsQueryService}
    ]
})
export class TripsModule {}
