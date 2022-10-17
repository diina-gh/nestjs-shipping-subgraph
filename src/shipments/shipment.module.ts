

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { ShipmentResolver } from './resolvers/shipment.resolver';
import { ShipmentService } from './services/shipment.service';

@Module({
  imports:[TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentResolver, ShipmentService]
})
export class ShipmentModule {}
