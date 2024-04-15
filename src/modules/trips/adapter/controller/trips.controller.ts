import {Body, Controller, Get, Inject, Param, Patch, Post, Query} from '@nestjs/common';
import {TripsCreateCommand} from "../../application/port/in/trips.create.command";
import {TripResponseDto} from "../model/trip.response.dto";
import {TripRequestDto} from "../model/trip.request.dto";
import {TripsFinishCommand} from "../../application/port/in/trips.finish.command";
import {Trip} from "../../../../domain/trip.entity";
import {TripsActiveQuery} from "../../application/port/in/trips.active.query";

@Controller('viajes')
export class TripsController {

    constructor(@Inject('TripsCreateCommand') private readonly tripsCreateService : TripsCreateCommand,
                @Inject('TripsFinishCommand') private readonly tripsFinishService : TripsFinishCommand,
                @Inject('TripsActiveQuery') private readonly tripsActiveService : TripsActiveQuery) {}

    @Post('/crear')
    async createNew(@Body() tripRequest : TripRequestDto) : Promise<TripResponseDto> {
        console.log(`request para crear solicitud de viaje con conductor id ${tripRequest.id_conductor}`)
        const trip : Trip = await this.tripsCreateService.execute(tripRequest.toDomain());
        return TripResponseDto.of(trip);
    }

    @Patch('/completar/:id')
    async finish(@Param('id') id : number) : Promise<TripResponseDto> {
        console.log(`request para completar de viaje con id ${id}`)
        const trip : Trip = await this.tripsFinishService.execute(id);
        return TripResponseDto.of(trip);
    }

    @Get('/consultar')
    async getTrips(@Query() filter : any) : Promise<TripResponseDto[]> {
        const {limit, offset, passenger_id} = filter;
        console.log('request para consultar viajes')
        const trips : Trip[] = await this.tripsActiveService.execute(limit, offset, passenger_id);
        return trips.map((trip : Trip) => {
            return TripResponseDto.of(trip);
        });
    }
}
