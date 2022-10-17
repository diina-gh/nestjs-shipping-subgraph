

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { StageResolver } from './resolvers/stage.resolver';
import { StageService } from './services/stage.service';

@Module({
  imports:[TypeOrmModule.forFeature([Stage])],
  providers: [StageResolver, StageService]
})
export class StageModule {}
