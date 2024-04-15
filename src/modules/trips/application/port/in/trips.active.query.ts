import {Trip} from "../../../../../domain/trip.entity";

export interface TripsActiveQuery{

    execute(limit : number, offset : number, passengerId : number) : Promise<Trip[]>;
}