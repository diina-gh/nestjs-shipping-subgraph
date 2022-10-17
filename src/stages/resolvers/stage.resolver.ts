import { Resolver, Mutation, Query, Args, InputType, Int, Info, ResolveReference } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { InputError } from 'src/_bases/entities/input-error.entity';
import { ServerError } from 'src/_bases/entities/server-error.entity';
import { Repository } from 'typeorm';
import { StageArgs } from '../dto/stage.args';
import { StageInput } from '../dto/stage.input';
import { PaginatedStage, PaginatedStageResult, Stage, StageResult } from '../entities/stage.entity';
import { StageService } from '../services/stage.service';


@Resolver(() => Stage)
export class StageResolver {

    constructor(
        private readonly stageService: StageService,
        @InjectRepository(Stage) private stageRepository: Repository<Stage>,
    ) {}

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }): Stage | any {
        return this.stageService.findOne(reference.id);
    }

    @Query(() => StageResult, {name: 'stage'})
    public async getOne(@Args('id') id: number): Promise<typeof StageResult> {
        try {
            const stage = await this.stageService.findOne(id);
            if (!stage) return new InputError("Ce livreur n'éxiste pas.") 
            return stage
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        };
    }

    @Query(() => PaginatedStageResult, {name: 'stages'})
    public async getMany(@Args('stageArgs') stagesArgs: StageArgs, @Info() infos: any): Promise<typeof PaginatedStageResult> {
        try {
            const stages = await this.stageService.findAll(stagesArgs, infos, 'stages');
            const count  = await this.stageService.count(stagesArgs)
            const hasNext = (count - (++(stagesArgs.page) * stagesArgs.take)) > 0
            return new PaginatedStage(stages, count, hasNext)
        } catch (error) {
            return new ServerError("Une erreur est survenue.", error) 
        }
    }

    @Mutation(() => StageResult, { name: 'saveStage' })
    public async upsert(@Args('stageInput') stageInput: StageInput): Promise<typeof StageResult> {
        try {
            if(stageInput.id){
                const updated = await this.stageService.update(stageInput.id, stageInput)
                if(updated) return await this.stageService.findOne(stageInput.id)
                else return new InputError("Ce livreur n'éxiste pas.")
            } 
    
            let entity = this.stageRepository.create(stageInput);
            return await this.stageService.create(entity);
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }
    }

    @Mutation(() => StageResult, { name: 'deleteStage' })
    public async delete(@Args('id', { type: () => Int }) id: number): Promise<typeof StageResult>  {
        try {
            const item = await this.stageService.findOne(id)
            if(item) await this.stageService.delete(id)
            else return new InputError("Ce livreur n'éxiste pas.")
            return item
        } 
        catch (e) {
            return new ServerError("Une erreur est survenue.", e) 
        }

    }

}