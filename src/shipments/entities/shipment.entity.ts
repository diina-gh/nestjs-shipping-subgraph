import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Deliveryman } from 'src/deliverymen/entities/deliveryman.entity';
import { Stage } from 'src/stages/entities/stage.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated-base.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Order } from 'src/_externals/order.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Shipment')
@Directive('@key(fields: "id")')
@Entity({name: 'shipments'})
export class Shipment extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({nullable: false})
  date: Date;

  @Field()
  @Column({ length: 1000, nullable: true })
  details: string;

  @Field()
  @Column({ nullable:false })
  orderId: number;

  @Field((type) => Order)
  order: Order;

  @Field()
  @Column({ nullable:false })
  stageId: number;

  @Field((type) => Stage)
  @ManyToOne(() => Stage, (stage) => stage.shipments)
  stage: Stage;

  @Field()
  @Column({ nullable:false })
  deliverymanId: number;

  @Field((type) => Deliveryman)
  @ManyToOne(() => Deliveryman, (deliveryman) => deliveryman.shipments)
  deliveryman: Deliveryman;


}

@ObjectType('PaginatedShipment')
export class PaginatedShipment extends PaginatedBase {

  @Field(() => [Shipment])
  shipments: Shipment[];

  constructor(Shipments: Shipment[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.shipments = Shipments
  }

}

export const ShipmentResult = createUnionType({
  name: 'ShipmentResult',
  types: () => [Shipment, InputError, ServerError] as const,
});

export const PaginatedShipmentResult = createUnionType({
  name: 'PaginatedShipmentResult',
  types: () => [PaginatedShipment, InputError, ServerError] as const,
});
