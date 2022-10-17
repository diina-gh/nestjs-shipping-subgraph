import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input_error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated_base.entity';
import { ServerError } from 'src/_bases/entities/server_error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Deliveryman')
@Directive('@key(fields: "id")')
@Entity({name: 'deliverymans'})
export class Deliveryman extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 10, nullable:false })
  civility: string;

  @Field()
  @Column({ length: 200, nullable:false })
  firstname: string;

  @Field()
  @Column({ length: 200, nullable:false })
  lastname: string;

  @Field()
  @Column({ length: 200, nullable:false })
  email: string;

  @Field()
  @Column({ length: 20, nullable:false })
  phone: string;

  @Field((type) => [Shipment])
  @OneToMany(() => Shipment, (shipments) => shipments.deliveryman)
  shipments: Shipment[];

}

@ObjectType('PaginatedDeliveryman')
export class PaginatedDeliveryman extends PaginatedBase {

  @Field(() => [Deliveryman])
  deliverymans: Deliveryman[];

  constructor(deliverymans: Deliveryman[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.deliverymans = deliverymans
  }

}

export const DeliverymanResult = createUnionType({
  name: 'DeliverymanResult',
  types: () => [Deliveryman, InputError, ServerError] as const,
});

export const PaginatedDeliverymanResult = createUnionType({
  name: 'PaginatedDeliverymanResult',
  types: () => [PaginatedDeliveryman, InputError, ServerError] as const,
});
