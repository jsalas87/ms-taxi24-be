import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Trip} from "../../../../domain/trip.entity";
import {EntityManager, Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {TripsFinishCommand} from "../port/in/trips.finish.command";
import {Invoice} from "../../../../domain/invoice.entity";
import {InvoiceDetail} from "../../../../domain/invoice.detail.entity";

@Injectable()
export class TripsFinishService implements TripsFinishCommand{

    constructor(@InjectRepository(Trip) private readonly tripRepository : Repository<Trip>,
                @InjectRepository(Invoice) private readonly invoiceRepository : Repository<Invoice>,
                private readonly configService : ConfigService,
                private readonly entityManager: EntityManager) {}

    async execute(id : number): Promise<Trip> {
        return this.entityManager.transaction(async (tem) => {

            let trip =  await this.tripRepository.findOne({where: {id: id},
            relations: ['passenger', 'driver']})

            if (!trip) {
                throw new NotFoundException(`No se encontró el viaje id ${trip.id}`)
            }

            trip.id = id;
            trip.active = false;
            trip.finished = true;

            await tem.save(trip);

            const invoice = this.createInvoice(trip);
            this.invoiceRepository.create(invoice);
            await tem.save(invoice);
            return trip;
        });
    }

    createInvoice(trip : Trip) : Invoice {


        const tax : number = trip.cost * this.configService.get('INVOICE.TAX');
        let detail = new InvoiceDetail();

        detail.quantity = 1;
        detail.description = 'Traslado ' + trip.destination.coordinates.toString();
        detail.price = trip.cost;
        detail.total = trip.cost;

        console.log(detail)

        let invoice = new Invoice();
        invoice.date = new Date();
        invoice.passenger = trip.passenger;
        invoice.active = true;
        invoice.details = [detail];
        invoice.subtotal = trip.cost;
        invoice.tax = tax;
        invoice.total = trip.cost + tax;

        console.log(invoice)

        return invoice;
    }

}
