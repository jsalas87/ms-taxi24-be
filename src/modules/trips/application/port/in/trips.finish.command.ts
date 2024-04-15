import {Trip} from "../../../../../domain/trip.entity";

export interface TripsFinishCommand {

    execute(id : number) : Promise<Trip>;
}