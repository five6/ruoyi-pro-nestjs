import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from 'src/common/constants/error.constants';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotifyMessage } from '../../../entity/system/notifyMessageEntity';

@Injectable()
export class NotifyMessageService {
  constructor(
    @InjectRepository(NotifyMessage)
    public readonly notifyMessageModel: Repository<NotifyMessage>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

}
