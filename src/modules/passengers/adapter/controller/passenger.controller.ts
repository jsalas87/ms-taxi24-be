import {Controller, Get, Inject, Param, Query} from '@nestjs/common';
import {PassengerResponseDto} from "../model/passenger.response.dto";
import {Passenger} from "../../../../domain/passenger.entity";
import {PassengerQueryService} from "../../application/usecase/passenger-query.service";
import {PassengersQueryService} from "../../application/usecase/passengers-query.service";
import {DriverDtoResponse} from "../../../drivers/adapter/model/driver-dtoresponse.dto.ts/driver-dto.response";
import {DriversQueryService} from "../../../drivers/application/usecase/drivers-query.service";
import {Driver} from "../../../../domain/driver.entity";

@Controller('pasajeros')
export class PassengerController {

    constructor(@Inject('PassengersQuery') private readonly passengersService : PassengersQueryService,
                @Inject('PassengerQuery') private readonly passengerService : PassengerQueryService,
                @Inject('DriversQuery') private readonly driversService : DriversQueryService) {}

    @Get('/consultar')
    async getDrivers(@Query() filter : any): Promise<PassengerResponseDto[]> {
        const {limit, offset} = filter;
        console.log(`El limit es ${limit} y el offset es ${offset} `)
        const passengers : Passenger[] = await this.passengersService.execute(limit,offset);
        return  passengers.map((passenger : Passenger) => {
            return PassengerResponseDto.of(passenger)
        });
    }

   @Get('/consultar/:id')
   async getDriver(@Param('id') id : number): Promise<PassengerResponseDto> {
        console.log(`El ids es ${id}`)
        const passenger = await this.passengerService.execute(id);
        return PassengerResponseDto.of(passenger);
    }

    @Get('/ubicacion/lat/:lat/lon/:lon')
    async getDriversLocation(@Param('lat') lat : number,
                             @Param('lon') lon : number,
                             @Query() filter : any): Promise<DriverDtoResponse[]> {
        const {limit, offset} = filter;
        console.log(`El limit es ${limit} y el offset es ${offset} lat ${lat} lon ${lon}`)
        const drivers : Driver[] = await this.driversService.execute(3,0,true,lat,lon);
        console.log(drivers);
        return  drivers.map((driver : Driver) => {
            return DriverDtoResponse.of(driver)
        });
    }
}
