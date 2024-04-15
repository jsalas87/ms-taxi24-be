import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {PassengersQuery} from "../port/in/passengers.query";
import {Passenger} from "../../../../domain/passenger.entity";

@Injectable()
export class PassengersQueryService implements PassengersQuery {

    constructor(@InjectRepository(Passenger) private readonly passengerRepository : Repository<Passenger>,
                private readonly configService : ConfigService) {}

    async execute(limit : number, offset : number) : Promise<Passenger[]> {
        if(limit == null || limit < 0) {
            limit = this.configService.get('DEFAULT.PAGE.LIMIT');
        }
        if(offset == null || offset < 0) {
            offset = this.configService.get('DEFAULT.PAGE.OFFSET');
        }
        return await this.passengerRepository.find({skip: offset, take: limit});
    }
}
