import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {Driver} from "../../../../domain/driver.entity";
import {Repository} from "typeorm";
import {DriverQuery} from "../port/in/driver.query";

@Injectable()
export class DriverQueryService implements DriverQuery {

    constructor(@InjectRepository(Driver) private readonly driverRepository : Repository<Driver>) {}

    async execute(id : string) : Promise<Driver> {
        return await this.driverRepository.findOneBy({id : parseInt(id,0)});
    }

}
