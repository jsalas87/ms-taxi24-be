import { Module } from '@nestjs/common';

import {TypeOrmModule} from "@nestjs/typeorm";;
import {Passenger} from "../../domain/passenger.entity";
import {Invoice} from "../../domain/invoice.entity";
import {InvoiceDetail} from "../../domain/invoice.detail.entity";
import {PassengersQueryService} from "./application/usecase/passengers-query.service";
import {PassengerController} from "./adapter/controller/passenger.controller";
import {PassengerQueryService} from "./application/usecase/passenger-query.service";
import {DriverQueryService} from "../drivers/application/usecase/driver-query.service";
import {Driver} from "../../domain/driver.entity";
import {DriversQueryService} from "../drivers/application/usecase/drivers-query.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([Passenger]),
        TypeOrmModule.forFeature([Invoice]),
        TypeOrmModule.forFeature([InvoiceDetail]),
        TypeOrmModule.forFeature([Driver])
    ],
    controllers : [PassengerController],
    providers : [
        {provide : 'PassengersQuery', useClass : PassengersQueryService},
        {provide : 'PassengerQuery', useClass : PassengerQueryService},
        {provide : 'DriversQuery', useClass : DriversQueryService},
    ],
})
export class PassengersModule {}
