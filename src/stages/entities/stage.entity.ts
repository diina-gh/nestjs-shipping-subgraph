import { createUnionType, Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { BaseModel } from 'src/_bases/entities/base.entity';
import { InputError } from 'src/_bases/entities/input_error.entity';
import { PaginatedBase } from 'src/_bases/entities/paginated_base.entity';
import { ServerError } from 'src/_bases/entities/server_error.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('Stage')
@Directive('@key(fields: "id")')
@Entity({name: 'stages'})
export class Stage extends BaseModel {

  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field()
  @Column({ length: 100, nullable:false })
  name: string;

  @Field()
  @Column({ length: 1000, nullable:false })
  desc: string;

  @Field()
  @Column({ nullable:true })
  nextStageId: number;

  @Field((type) => Stage)
  @OneToOne(() => Stage, (stage) => stage.previous)
  nextStage: Stage;

  @Field((type) => Stage)
  @OneToOne(() => Stage, (stage) => stage.nextStage)
  previous: Stage;

  @Field((type) => [Shipment])
  @OneToMany(() => Shipment, (shipments) => shipments.stage)
  shipments: Shipment[];

}

@ObjectType('PaginatedStage')
export class PaginatedStage extends PaginatedBase {

  @Field(() => [Stage])
  stages: Stage[];

  constructor(stages: Stage[], count: number, hasNext: boolean){
    super(count, hasNext)
    this.stages = stages
  }

}

export const StageResult = createUnionType({
  name: 'StageResult',
  types: () => [Stage, InputError, ServerError] as const,
});

export const PaginatedStageResult = createUnionType({
  name: 'PaginatedStageResult',
  types: () => [PaginatedStage, InputError, ServerError] as const,
});
