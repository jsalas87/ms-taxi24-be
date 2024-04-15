import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {PassengersQuery} from "../port/in/passengers.query";
import {Passenger} from "../../../../domain/passenger.entity";
import {PassengerQuery} from "../port/in/passenger.query";

@Injectable()
export class PassengerQueryService implements PassengerQuery {

    constructor(@InjectRepository(Passenger) private readonly passengerRepository : Repository<Passenger>) {}

    async execute(id : number) : Promise<Passenger> {
        return await this.passengerRepository.findOneBy({id : id});
    }
}
