import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {DriverController} from "./adapter/controller/driver.controller";
import {DriversQueryService} from "./application/usecase/drivers-query.service";
import {Driver} from "../../domain/driver.entity";
import {DriverQueryService} from "./application/usecase/driver-query.service";

@Module({
    imports : [TypeOrmModule.forFeature([Driver])],
    controllers : [DriverController],
    providers : [
        {provide : 'DriversQuery', useClass : DriversQueryService},
        {provide : 'DriverQuery', useClass : DriverQueryService}
    ]
})
export class DriversModule {}
