import {Passenger} from "../../../../../domain/passenger.entity";

export interface PassengerQuery {

    execute (id : number) : Promise<Passenger>;
}