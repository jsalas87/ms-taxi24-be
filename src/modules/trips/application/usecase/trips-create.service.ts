import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {TripsCreateCommand} from "../port/in/trips.create.command";
import {Trip} from "../../../../domain/trip.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {Driver} from "../../../../domain/driver.entity";
import {Passenger} from "../../../../domain/passenger.entity";

@Injectable()
export class TripsCreateService implements TripsCreateCommand{

    constructor(@InjectRepository(Trip) private readonly tripRepository : Repository<Trip>,
                @InjectRepository(Driver) private readonly driverRepository : Repository<Driver>,
                @InjectRepository(Passenger) private readonly passengerRepository : Repository<Passenger>,
                private readonly configService : ConfigService) {}

    async execute(trip: Trip): Promise<Trip> {

        const passenger = this.passengerRepository.findOne({where : {id : trip.passenger.id}})
        const driver : Driver = await this.driverRepository.findOne({where : {id : trip.driver.id}});

        if (!driver) {
            throw new NotFoundException(`No se encontró el conductor id ${trip.driver.id}`)
        }

        if (!(await passenger)) {
            throw new NotFoundException(`No se encontró el pasajero id ${trip.passenger.id}`)
        }

        if (trip.origin.coordinates.length !=2 || trip.destination.coordinates.length !=2) {
            throw new BadRequestException(`las coordenadas origen y destino deben tener exactamente 2 elementos`)
        }

        trip.active = true;
        trip.finished = false;
        const max = this.configService.get('AMOUNT.MAX.TRIP');
        const min = this.configService.get('AMOUNT.MIN.TRIP');
        trip.cost = Math.floor(Math.random() * (max - min + 1)) + min;
        trip.date = new Date();

        this.tripRepository.create(trip);
        await this.tripRepository.save(trip);
        return this.tripRepository.findOne({
            where: {id: trip.id},
            relations: ['driver', 'passenger']
        });
    }

}
