import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Deliveryman } from '../entities/deliveryman.entity';

@Injectable()
export class DeliverymanService extends BaseService<Deliveryman> {

  constructor(
    @InjectRepository(Deliveryman)
    private itemRepository: Repository<Deliveryman>,
  ) 
  {
    super(itemRepository);
  }


}
