import {Trip} from "../../../../domain/trip.entity";
import {Passenger} from "../../../../domain/passenger.entity";
import {Driver} from "../../../../domain/driver.entity";
import {Point} from "typeorm";
import {IsArray, IsNumber} from "class-validator";

export class TripRequestDto {

    @IsNumber()
    id_pasajero : number
    @IsNumber()
    id_conductor : number
    @IsArray()
    origen : number[]
    @IsArray()
    destino : number[]

    toDomain() : Trip {
        let passenger : Passenger = new Passenger();
        passenger.setId(this.id_pasajero);
        let driver : Driver = new Driver();
        driver.id = this.id_conductor;

        let trip: Trip = new Trip();
        trip.passenger = passenger;
        trip.driver = driver;

        const origin: Point = {
            type: 'Point',
            coordinates: this.origen,
        };

        const destination: Point = {
            type: 'Point',
            coordinates: this.destino,
        };

        trip.origin = origin;
        trip.destination = destination;

        return trip;
    }

}