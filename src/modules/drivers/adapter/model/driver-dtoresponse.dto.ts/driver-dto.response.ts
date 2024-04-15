import {IsBoolean, IsNumber, IsString} from "class-validator";
import {Driver} from "../../../../../domain/driver.entity";

export class DriverDtoResponse {

    @IsNumber()
    id: number
    @IsString()
    nombre_completo : string
    @IsString()
    sexo :string
    @IsNumber()
    edad : number
    @IsBoolean()
    disponible : boolean
    @IsString()
    ultima_ubicacion : string

    static of(driver : Driver) : DriverDtoResponse {
        return {
            id : driver.id,
            nombre_completo : driver.fullName,
            sexo : driver.sex,
            edad : driver.getAge(),
            disponible : driver.available,
            ultima_ubicacion : driver.lastLocation
        }
    }
}
