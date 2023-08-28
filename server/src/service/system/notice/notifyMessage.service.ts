import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { NotifyMessage } from '../../../entity/system/notifyMessageEntity';

@Injectable()
export class NotifyMessageService {
  constructor(
    @InjectRepository(NotifyMessage)
    public readonly repostory: MongoRepository<NotifyMessage>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}
}
