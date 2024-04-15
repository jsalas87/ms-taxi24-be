import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Trip} from "../../../../domain/trip.entity";
import {EntityManager, Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {TripsFinishCommand} from "../port/in/trips.finish.command";
import {Invoice} from "../../../../domain/invoice.entity";
import {InvoiceDetail} from "../../../../domain/invoice.detail.entity";
import {TripsActiveQuery} from "../port/in/trips.active.query";

@Injectable()
export class TripsQueryService implements TripsActiveQuery{

    constructor(@InjectRepository(Trip) private readonly tripRepository : Repository<Trip>,
                private readonly configService : ConfigService,
                private readonly entityManager: EntityManager) {}

    async execute(limit: number, offset: number, passengerId: number): Promise<Trip[]> {

        if(limit == null || limit < 0) {
            limit = this.configService.get('DEFAULT.PAGE.LIMIT');
        }
        if(offset == null || offset < 0) {
            offset = this.configService.get('DEFAULT.PAGE.OFFSET');
        }
        if (passengerId!=null) {
            const filterCondition = { passenger: {id : passengerId}, active : true };
            return await this.tripRepository.find({skip : offset, take: limit, where : filterCondition,
                relations : ['driver', 'passenger']});
        } else {
            return await this.tripRepository.find({skip: offset, take: limit, where : {active : true},
                relations : ['driver', 'passenger']});
        }
    }


}
