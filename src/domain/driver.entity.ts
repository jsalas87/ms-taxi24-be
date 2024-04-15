import {Column, Entity, OneToMany, Point, PrimaryGeneratedColumn} from "typeorm";
import {Trip} from "./trip.entity";

@Entity('driver')
export class Driver {

    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({name: 'full_name'})
    fullName: string
    @Column({name:'sex'})
    sex:string
    @Column({name:'birth_date', type:"date"})
    birthDate: Date
    @Column()
    available:boolean
    @Column({name: 'last_location', type: 'geometry', spatialFeatureType: 'Point', srid: 4326})
    lastLocation : string
    @OneToMany((type) => Trip, trip => trip.driver)
    trips : Trip[]

    getAge() : number {

        const actualDate : Date = new Date();
        const birthDate : Date = new Date(this.birthDate);
        let age : number = actualDate.getFullYear() - birthDate.getFullYear();

        const actualMonth : number = actualDate.getMonth();
        const actualDay : number = actualDate.getDate();
        const birthMonth : number = birthDate.getMonth();
        const birthDay : number = birthDate.getDate();

        if (birthMonth > actualMonth || (birthMonth === actualMonth && birthDay > actualDay)) {
            age--;
        }

        return age;
    }


}