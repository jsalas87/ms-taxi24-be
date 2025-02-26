import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {Driver} from "../../../../domain/driver.entity";
import {DriverDtoResponse} from "../model/driver-dtoresponse.dto.ts/driver-dto.response";
import {DriversQueryService} from "../../application/usecase/drivers-query.service";
import {DriverQueryService} from "../../application/usecase/driver-query.service";

@Controller('conductores')
export class DriverController {

    constructor(@Inject('DriversQuery') private readonly driversService : DriversQueryService,
                @Inject('DriverQuery') private readonly driverService : DriverQueryService) {}

    @Get('/consultar')
    async getDrivers(@Query() filter : any): Promise<DriverDtoResponse[]> {
        const {limit, offset, available, lat, lon} = filter;
        console.log(`El limit es ${limit} y el offset es ${offset} y el available es ${available} lat ${lat} lon ${lon}`)
        const drivers : Driver[] = await this.driversService.execute(limit,offset,available,lat,lon);
        return  drivers.map((driver : Driver) => {
            return DriverDtoResponse.of(driver)
        });
    }

    @Get('/ubicacion/lat/:lat/lon/:lon')
    async getDriversLocation(@Param('lat') lat : number,
                             @Param('lon') lon : number,
                             @Query() filter : any): Promise<DriverDtoResponse[]> {
        const {limit, offset} = filter;
        console.log(`El limit es ${limit} y el offset es ${offset} lat ${lat} lon ${lon}`)
        const drivers : Driver[] = await this.driversService.execute(limit,offset,true,lat,lon);
        return  drivers.map((driver : Driver) => {
            return DriverDtoResponse.of(driver)
        });
    }

   @Get('/consultar/:id')
   async getDriver(@Param('id') id : number): Promise<DriverDtoResponse> {
        console.log(`El ids es ${id}`)
        const driver = await this.driverService.execute(id);
        return DriverDtoResponse.of(driver);
    }
}
