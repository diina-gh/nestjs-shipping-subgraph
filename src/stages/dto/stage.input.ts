import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/_bases/dto/base.input';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max } from "class-validator";

@InputType()
export class StageInput extends BaseInput {
  
    @Field()
    @Length(2, 50)
    name: string;
  
    @Field({nullable: true})
    @Length(0, 1000)
    desc: string;
  
    @Field()
    nextStageId: number;
  
}