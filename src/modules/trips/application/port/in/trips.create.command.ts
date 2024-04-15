import {Trip} from "../../../../../domain/trip.entity";

export interface TripsCreateCommand {

    execute(trip : Trip) : Promise<Trip>;
}