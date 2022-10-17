import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { DeliverymanArgs } from '../dto/deliveryman.args';
import { DeliverymanInput } from '../dto/deliveryman.input';
import { PaginatedDeliveryman, PaginatedDeliverymanResult, Deliveryman, DeliverymanResult } from '../entities/deliveryman.entity';
import { DeliverymanService } from '../services/deliveryman.service';


@Resolver(() => Deliveryman)
export class DeliverymanResolver {

    constructor(
        private readonly deliverymanService: DeliverymanService,
        @InjectRepository(Deliveryman) private deliverymanRepository: Repository<Deliveryman>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Deliveryman | any {
        return this.deliverymanService.findOne(reference.id);
    }

    @Query(() => DeliverymanResult, {name: 'deliveryman'})
    public async getOne(@Args('id') id: number): Promise<typeof DeliverymanResult> {
        try {
            const deliveryman = await this.deliverymanService.findOne(id);
            if (!deliveryman) return new InputError("Ce livreur n'éxiste pas.") 
            return deliveryman
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedDeliverymanResult, {name: 'deliverymans'})
    public async getMany(@Args('deliverymanArgs') deliverymansArgs: DeliverymanArgs, @Info() infos: any): Promise<typeof PaginatedDeliverymanResult> {
        try {
            const deliverymans = await this.deliverymanService.findAll(deliverymansArgs, infos, 'deliverymans');
            const count  = await this.deliverymanService.count(deliverymansArgs)
            const hasNext = (count - (++(deliverymansArgs.page) * deliverymansArgs.take)) > 0
            return new PaginatedDeliveryman(deliverymans, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => DeliverymanResult, { name: 'saveDeliveryman' })
    public async upsert(@Args('deliverymanInput') deliverymanInput: DeliverymanInput): Promise<typeof DeliverymanResult> {
        try {
            if(deliverymanInput.id){
                const updated = await this.deliverymanService.update(deliverymanInput.id, deliverymanInput)
                if(updated) return await this.deliverymanService.findOne(deliverymanInput.id)
                else return new InputError("Ce livreur n'éxiste pas.")
            } 
    
            let entity = this.deliverymanRepository.create(deliverymanInput);
            return await this.deliverymanService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => DeliverymanResult, { name: 'deleteDeliveryman' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof DeliverymanResult>  {
        try {
            const item = await this.deliverymanService.findOne(id)
            if(item) await this.deliverymanService.delete(id)
            else return new InputError("Ce livreur n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}