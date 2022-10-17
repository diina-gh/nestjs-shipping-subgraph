import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/_bases/services/base.service';
import { Brackets, ILike, Like, Repository } from 'typeorm';
import { Stage } from '../entities/stage.entity';

@Injectable()
export class StageService extends BaseService<Stage> {

  constructor(
    @InjectRepository(Stage)
    private itemRepository: Repository<Stage>,
  ) 
  {
    super(itemRepository);
  }


}
