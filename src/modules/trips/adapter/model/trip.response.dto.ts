import {Trip} from "../../../../domain/trip.entity";
import {Point} from "typeorm";

export class TripResponseDto {

    id: number
    origen : Point
    destino : Point
    costo: number
    fecha: Date
    conductor : string
    pasajero : string

    static of(trip : Trip) : TripResponseDto {
        return {
            id : trip.id,
            origen : trip.origin,
            destino : trip.destination,
            costo : trip.cost,
            fecha : trip.date,
            conductor : trip.driver.fullName,
            pasajero : trip.passenger.fullName
        }
    }

}