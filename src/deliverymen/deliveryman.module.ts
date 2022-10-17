

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliveryman } from './entities/deliveryman.entity';
import { DeliverymanResolver } from './resolvers/deliveryman.resolver';
import { DeliverymanService } from './services/deliveryman.service';

@Module({
  imports:[TypeOrmModule.forFeature([Deliveryman])],
  providers: [DeliverymanResolver, DeliverymanService]
})
export class DeliverymanModule {}
