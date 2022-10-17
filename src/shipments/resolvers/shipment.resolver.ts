import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Order } from 'src/_externals/order.entity';
import { Repository } from 'typeorm';
import { ShipmentArgs } from '../dto/shipment.args';
import { ShipmentInput } from '../dto/shipment.input';
import { PaginatedShipment, PaginatedShipmentResult, Shipment, ShipmentResult } from '../entities/shipment.entity';
import { ShipmentService } from '../services/shipment.service';


@Resolver(() => Shipment)
export class ShipmentResolver {

    constructor(
        private readonly shipmentService: ShipmentService,
        @InjectRepository(Shipment) private shipmentRepository: Repository<Shipment>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Shipment | any {
        return this.shipmentService.findOne(reference.id);
    }

    @ResolveField((of) => Order)
    user(@Parent() shipment: Shipment): any {
      return { __typename: 'Order', id: shipment.orderId };
    }

    @Query(() => ShipmentResult, {name: 'shipment'})
    public async getOne(@Args('id') id: number): Promise<typeof ShipmentResult> {
        try {
            const shipment = await this.shipmentService.findOne(id);
            if (!shipment) return new InputError("Ce shipment n'éxiste pas.") 
            return shipment
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedShipmentResult, {name: 'shipments'})
    public async getMany(@Args('shipmentArgs') shipmentsArgs: ShipmentArgs, @Info() infos: any): Promise<typeof PaginatedShipmentResult> {
        try {
            const shipments = await this.shipmentService.findAll(shipmentsArgs, infos, 'shipments');
            const count  = await this.shipmentService.count(shipmentsArgs)
            const hasNext = (count - (++(shipmentsArgs.page) * shipmentsArgs.take)) > 0
            return new PaginatedShipment(shipments, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => ShipmentResult, { name: 'saveShipment' })
    public async upsert(@Args('shipmentInput') shipmentInput: ShipmentInput): Promise<typeof ShipmentResult> {
        try {
            if(shipmentInput.id){
                const updated = await this.shipmentService.update(shipmentInput.id, shipmentInput)
                if(updated) return await this.shipmentService.findOne(shipmentInput.id)
                else return new InputError("Ce shipment n'éxiste pas.")
            } 
    
            let entity = this.shipmentRepository.create(shipmentInput);
            return await this.shipmentService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => ShipmentResult, { name: 'deleteShipment' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof ShipmentResult>  {
        try {
            const item = await this.shipmentService.findOne(id)
            if(item) await this.shipmentService.delete(id)
            else return new InputError("Ce shipment n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}