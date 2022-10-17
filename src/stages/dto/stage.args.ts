import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { DeliverymanFilterArgs } from './deliveryman-filter.args';
import { DeliverymanOrderArgs } from './deliveryman-order.args';

@InputType()
export class DeliverymanArgs extends BaseArgs {

    @Field(() => DeliverymanFilterArgs, {nullable: true})
    filter: DeliverymanFilterArgs

    @Field(() => DeliverymanOrderArgs, {nullable: true})
    orderBy: DeliverymanOrderArgs
    
}