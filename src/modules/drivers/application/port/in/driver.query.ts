import {Driver} from "../../../../../domain/driver.entity";

export interface DriverQuery {
     execute(id : number) : Promise<Driver>;
}