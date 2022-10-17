import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { BaseArgs } from 'src/_bases/dto/base.args';
import { StageFilterArgs } from './stage-filter.args';
import { StageOrderArgs } from './stage-order.args';

@InputType()
export class StageArgs extends BaseArgs {

    @Field(() => StageFilterArgs, {nullable: true})
    filter: StageFilterArgs

    @Field(() => StageOrderArgs, {nullable: true})
    orderBy: StageOrderArgs
    
}