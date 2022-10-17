import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class DeliverymanInput extends BaseInput {

    @Field()
    civility: string;
  
    @Field()
    @Length(2, 200)
    firstname: string;
  
    @Field()
    @Length(2, 200)
    lastname: string;
  
    @Field()
    @Max(200)
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @Field()
    @Length(2, 20)
    phone: string;
  

}