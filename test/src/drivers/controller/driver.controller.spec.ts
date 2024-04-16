import { Test, TestingModule } from '@nestjs/testing';
import {DriverController} from "../../../../src/modules/drivers/adapter/controller/driver.controller";
import {
    DriverDtoResponse
} from "../../../../src/modules/drivers/adapter/model/driver-dtoresponse.dto.ts/driver-dto.response";
import {DriverQueryService} from "../../../../src/modules/drivers/application/usecase/driver-query.service";
import {DriversQueryService} from "../../../../src/modules/drivers/application/usecase/drivers-query.service";
import { Driver } from 'src/domain/driver.entity';

describe('DriverController', () => {
    let driverController: DriverController;
    let driversQueryService: jest.Mocked<DriversQueryService>;
    let driverQueryService: jest.Mocked<DriverQueryService>;

    const instance : Driver = {
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
            controllers: [DriverController],
            providers: [
                {
                    provide: 'DriversQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: 'DriverQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        driverController = module.get<DriverController>(DriverController);
        driversQueryService = module.get<DriversQueryService>('DriversQuery') as jest.Mocked<DriversQueryService>;
        driverQueryService = module.get<DriverQueryService>('DriverQuery') as jest.Mocked<DriverQueryService>;
    });

    describe('getDrivers', () => {
        it('should return an array of DriverDtoResponse', async () => {
            const filter = { limit: 10, offset: 0, available: true, lat: 28.5, lon: -81.4 };
            const drivers: Driver[] = [
               instance
            ];
            driversQueryService.execute.mockResolvedValueOnce(drivers);

            const result = await driverController.getDrivers(filter);

            expect(result).toEqual(drivers.map(driver => DriverDtoResponse.of(driver)));
            expect(driversQueryService.execute).toHaveBeenCalledWith(filter.limit, filter.offset, filter.available, filter.lat, filter.lon);
        });
    });

    describe('getDriversLocation', () => {
        it('should return an array of DriverDtoResponse', async () => {
            const lat = 28.5;
            const lon = -81.4;
            const filter = { limit: 10, offset: 0 };
            const drivers: Driver[] = [
                /* Puedes agregar aquí instancias de Driver para probar */
            ];
            driversQueryService.execute.mockResolvedValueOnce(drivers);

            const result = await driverController.getDriversLocation(lat, lon, filter);

            expect(result).toEqual(drivers.map(driver => DriverDtoResponse.of(driver)));
            expect(driversQueryService.execute).toHaveBeenCalledWith(filter.limit, filter.offset, true, lat, lon);
        });
    });

    describe('getDriver', () => {
        it('should return a DriverDtoResponse', async () => {
            const id = 1;
            const driver: Driver = instance;
            driverQueryService.execute.mockResolvedValueOnce(driver);

            const result = await driverController.getDriver(id);

            expect(result).toEqual(DriverDtoResponse.of(driver));
            expect(driverQueryService.execute).toHaveBeenCalledWith(id);
        });
    });
});
