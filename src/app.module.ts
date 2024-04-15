import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

import {DriversModule} from "./modules/drivers/drivers.module";
import {TripsModule} from "./modules/trips/trips.module";
import {PassengersModule} from "./modules/passengers/passengers.module";

@Module({

  imports: [
      DriversModule,
      TripsModule,
      PassengersModule,

      ConfigModule.forRoot({
        isGlobal: true
      }),

      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory:  (configService: ConfigService) => ({
          autoLoadEntities: true,
          database: configService.get('NEST.DATASOURCE.DATABASE'),
          host: configService.get('NEST.DATASOURCE.HOST'),
          password: configService.get('NEST.DATASOURCE.PASSWORD'),
          port: +configService.get('NEST.DATASOURCE.PORT'),
          synchronize: true,
          type: 'postgres',
          username: configService.get('NEST.DATASOURCE.USERNAME')
        })
      }),
  ],
})
export class AppModule {}
