import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {Driver} from "../../../../domain/driver.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {DriversQuery} from "../port/in/drivers.query";

@Injectable()
export class DriversQueryService implements DriversQuery {

    constructor(@InjectRepository(Driver) private readonly driverRepository : Repository<Driver>,
                private readonly configService : ConfigService) {}

    async execute(limit : number, offset : number, available : boolean, lat : number, lon : number) : Promise<Driver[]> {
        if(limit == null || limit < 0) {
            limit = this.configService.get('DEFAULT.PAGE.LIMIT');
        }
        if(offset == null || offset < 0) {
            offset = this.configService.get('DEFAULT.PAGE.OFFSET');
        }
        if (available!=null) {
            const filterCondition = { available: available };
            if (lat!=null && lon!=null) {
                return this.getDistance(lat, lon, limit, offset, available);
            }
            return await this.driverRepository.find({skip : offset, take: limit, where : filterCondition});
        } else {
            return await this.driverRepository.find({skip: offset, take: limit});
        }
    }

    async getDistance(lat : number, lon : number, limit : number, offset : number, available : boolean) : Promise<Driver[]> {
        return   await this.driverRepository
            .createQueryBuilder('driver')
            .where(
                'ST_DWithin(driver.last_location, ST_SetSRID(ST_Point(:x, :y), 4326), :distance)',
                {x: lat, y: lon, distance: 0.027}
            )
            .andWhere('driver.available = :available',{available : available})
            .skip(offset)
            .take(limit)
            .getMany();
    }
}
