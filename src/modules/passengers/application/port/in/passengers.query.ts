import {Passenger} from "../../../../../domain/passenger.entity";

export interface PassengersQuery {

    execute (limit : number, offset : number) : Promise<Passenger[]>;
}