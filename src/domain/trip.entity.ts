import {Column, Entity, JoinColumn, ManyToOne, Point, PrimaryGeneratedColumn} from "typeorm";
import {Driver} from "./driver.entity";
import {Passenger} from "./passenger.entity";

@Entity('trip')
export class Trip {

    @PrimaryGeneratedColumn('increment', {name : 'id'})
    id: number
    @Column({name: 'origin', type: 'geometry', spatialFeatureType: 'Point', srid: 4326})
    origin : Point
    @Column({name: 'destination', type: 'geometry', spatialFeatureType: 'Point', srid: 4326})
    destination : Point
    @Column({name:'active'})
    active: boolean
    @Column({name:'finished', default : false})
    finished: boolean
    @Column({name:'cost'})
    cost: number
    @Column({name:'date', type:"date"})
    date: Date
    @ManyToOne((type) => Driver, driver => driver.trips, {cascade : true})
    @JoinColumn({name : 'driver_id'})
    driver : Driver
    @ManyToOne((type) => Passenger, pass => pass.trips, {cascade : true})
    @JoinColumn({name : 'passenger_id'})
    passenger : Passenger
}