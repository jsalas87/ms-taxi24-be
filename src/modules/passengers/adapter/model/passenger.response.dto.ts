import {Passenger} from "../../../../domain/passenger.entity";

export class PassengerResponseDto {

    id: number
    dni: string
    nombre_completo: string
    direccion : string
    telefono : string

    static of(passenger : Passenger) : PassengerResponseDto {
        return {
            id : passenger.id,
            dni : passenger.dni,
            nombre_completo : passenger.fullName,
            direccion : passenger.address,
            telefono : passenger.phone
        }
    }

}