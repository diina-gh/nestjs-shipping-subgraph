import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { ShipmentFilterArgs } from './shipment-filter.args';
import { ShipmentOrderArgs } from './shipment-order.args';

@InputType()
export class ShipmentArgs extends BaseArgs {

    @Field(() => ShipmentFilterArgs, {nullable: true})
    filter: ShipmentFilterArgs

    @Field(() => ShipmentOrderArgs, {nullable: true})
    orderBy: ShipmentOrderArgs
    
}