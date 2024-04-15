import {Driver} from "../../../../../domain/driver.entity";

export interface DriversQuery {
     execute(limit : number, offset : number, available : boolean, lat : number, lon : number) : Promise<Driver[]>;
}