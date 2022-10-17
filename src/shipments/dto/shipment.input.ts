import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class ShipmentInput extends BaseInput {

    @Field({nullable: false})
    date: Date;
  
    @Field({nullable: true})
    @Length(0, 1000)  
    details: string;

    @Field({nullable: false})
    categoryId: number;

    @Field({nullable: false})
    stageId: number;

    @Field({nullable: false})
    deliverymanId: number;

}