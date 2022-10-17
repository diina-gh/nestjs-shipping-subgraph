import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';

@Injectable()
export class ShipmentService extends BaseService<Shipment> {

  constructor(
    @InjectRepository(Shipment)
    private itemRepository: Repository<Shipment>,
  ) 
  {
    super(itemRepository);
  }


}
