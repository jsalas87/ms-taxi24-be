import { Test, TestingModule } from '@nestjs/testing';
import {
    DriverDtoResponse
} from "../../../../src/modules/drivers/adapter/model/driver-dtoresponse.dto.ts/driver-dto.response";
import {PassengerResponseDto} from "../../../../src/modules/passengers/adapter/model/passenger.response.dto";
import { Driver } from 'src/domain/driver.entity';
import {Passenger} from "../../../../src/domain/passenger.entity";
import {DriversQueryService} from "../../../../src/modules/drivers/application/usecase/drivers-query.service";
import {PassengerQueryService} from "../../../../src/modules/passengers/application/usecase/passenger-query.service";
import {PassengersQueryService} from "../../../../src/modules/passengers/application/usecase/passengers-query.service";
import {PassengerController} from "../../../../src/modules/passengers/adapter/controller/passenger.controller";

describe('PassengerController', () => {
    let passengerController: PassengerController;
    let passengersQueryService: jest.Mocked<PassengersQueryService>;
    let passengerQueryService: jest.Mocked<PassengerQueryService>;
    let driversQueryService: jest.Mocked<DriversQueryService>;

    const instance : Passenger = {
        id : 1,
        dni : '19482290',
        fullName : 'Juan S',
        address : 'Caracas',
        phone : '1597079',
        trips : [],
        invoices : [],
        setId(id: number): void {
            this.id = id;
        },
    }

    const instanceDriver : Driver = {
        id : 1,
        fullName : 'Juan S',
        sex : 'Male',
        birthDate : new Date('1987-10-18'),
        available: true,
        lastLocation : '0101000020E6100000AB329DE799883C402C2CB81FF05B54C0',
        trips : [],
        getAge(): number {
            return 30;
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PassengerController],
            providers: [
                {
                    provide: 'PassengersQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: 'PassengerQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: 'DriversQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        passengerController = module.get<PassengerController>(PassengerController);
        passengersQueryService = module.get<PassengersQueryService>('PassengersQuery') as jest.Mocked<PassengersQueryService>;
        passengerQueryService = module.get<PassengerQueryService>('PassengerQuery') as jest.Mocked<PassengerQueryService>;
        driversQueryService = module.get<DriversQueryService>('DriversQuery') as jest.Mocked<DriversQueryService>;
    });

    describe('getDrivers', () => {
        it('should return an array of PassengerResponseDto', async () => {
            const filter = { limit: 10, offset: 0 };
            const passengers: Passenger[] = [
                instance
            ];
            passengersQueryService.execute.mockResolvedValueOnce(passengers);

            const result = await passengerController.getDrivers(filter);

            expect(result).toEqual(passengers.map(passenger => PassengerResponseDto.of(passenger)));
            expect(passengersQueryService.execute).toHaveBeenCalledWith(filter.limit, filter.offset);
        });
    });

    describe('getDriver', () => {
        it('should return a PassengerResponseDto', async () => {
            const id = 1;
            const passenger: Passenger = instance;
            passengerQueryService.execute.mockResolvedValueOnce(passenger);

            const result = await passengerController.getDriver(id);

            expect(result).toEqual(PassengerResponseDto.of(passenger));
            expect(passengerQueryService.execute).toHaveBeenCalledWith(id);
        });
    });

    describe('getDriversLocation', () => {
        it('should return an array of DriverDtoResponse', async () => {
            const lat = 28.5;
            const lon = -81.4;
            const filter = { limit: 10, offset: 0 };
            const drivers: Driver[] = [
                instanceDriver
            ];
            driversQueryService.execute.mockResolvedValueOnce(drivers);

            const result = await passengerController.getDriversLocation(lat, lon, filter);

            expect(result).toEqual(drivers.map(driver => DriverDtoResponse.of(driver)));
            expect(driversQueryService.execute).toHaveBeenCalledWith(3, 0, true, lat, lon);
        });
    });
});
