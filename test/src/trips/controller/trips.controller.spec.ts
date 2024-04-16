import { Test, TestingModule } from '@nestjs/testing';

import {Trip} from "../../../../src/domain/trip.entity";
import {TripResponseDto} from "../../../../src/modules/trips/adapter/model/trip.response.dto";
import {TripRequestDto} from "../../../../src/modules/trips/adapter/model/trip.request.dto";
import {TripsActiveQuery} from "../../../../src/modules/trips/application/port/in/trips.active.query";
import {TripsFinishCommand} from "../../../../src/modules/trips/application/port/in/trips.finish.command";
import {TripsCreateCommand} from "../../../../src/modules/trips/application/port/in/trips.create.command";
import {TripsController} from "../../../../src/modules/trips/adapter/controller/trips.controller";
import {Passenger} from "../../../../src/domain/passenger.entity";
import {Driver} from "../../../../src/domain/driver.entity";

describe('TripsController', () => {
    let tripsController: TripsController;
    let tripsCreateService: jest.Mocked<TripsCreateCommand>;
    let tripsFinishService: jest.Mocked<TripsFinishCommand>;
    let tripsActiveService: jest.Mocked<TripsActiveQuery>;

    const instance: Trip = {
        id : 1,
        origin : {type : 'Point', coordinates: [1,1]},
        destination : {type : 'Point', coordinates: [2,2]},
        active:true,
        finished:true,
        cost : 3,
        date : new Date(),
        driver : new Driver(),
        passenger : new Passenger(),
    };

    const tripRequest: TripRequestDto = {
        id_pasajero : 1,
        id_conductor : 1,
        origen : [1,1],
        destino : [2,2],
        toDomain(): Trip {
            return instance;
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TripsController],
            providers: [
                {
                    provide: 'TripsCreateCommand',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: 'TripsFinishCommand',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: 'TripsActiveQuery',
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        tripsController = module.get<TripsController>(TripsController);
        tripsCreateService = module.get<TripsCreateCommand>('TripsCreateCommand') as jest.Mocked<TripsCreateCommand>;
        tripsFinishService = module.get<TripsFinishCommand>('TripsFinishCommand') as jest.Mocked<TripsFinishCommand>;
        tripsActiveService = module.get<TripsActiveQuery>('TripsActiveQuery') as jest.Mocked<TripsActiveQuery>;
    });

    describe('createNew', () => {
        it('should create a new trip and return TripResponseDto', async () => {

            tripsCreateService.execute.mockResolvedValueOnce(instance);

            const result = await tripsController.createNew(tripRequest);

            expect(result).toEqual(TripResponseDto.of(instance));
            expect(tripsCreateService.execute).toHaveBeenCalledWith(tripRequest.toDomain());
        });
    });

    describe('finish', () => {
        it('should complete a trip and return TripResponseDto', async () => {
            const id = 1;

            tripsFinishService.execute.mockResolvedValueOnce(instance);

            const result = await tripsController.finish(id);

            expect(result).toEqual(TripResponseDto.of(instance));
            expect(tripsFinishService.execute).toHaveBeenCalledWith(id);
        });
    });

    describe('getTrips', () => {
        it('should return an array of TripResponseDto', async () => {
            const filter = { limit: 10, offset: 0, passenger_id: 1 };
            const trips: Trip[] = [
                // Instancias de Trip para probar
            ];

            tripsActiveService.execute.mockResolvedValueOnce(trips);

            const result = await tripsController.getTrips(filter);

            expect(result).toEqual(trips.map(trip => TripResponseDto.of(trip)));
            expect(tripsActiveService.execute).toHaveBeenCalledWith(filter.limit, filter.offset, filter.passenger_id);
        });
    });
});
