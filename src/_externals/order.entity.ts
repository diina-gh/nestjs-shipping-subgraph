import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { OneToOne } from 'typeorm';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Order {

  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => Shipment, {nullable: true})
  shipment: Shipment;
}