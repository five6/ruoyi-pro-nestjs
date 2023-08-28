import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { NotifyTemplate } from '../../../entity/system/notifyTemplateEntity';
import * as _ from 'lodash';

@Injectable()
export class NotifyTemplateService {
  constructor(
    @InjectRepository(NotifyTemplate)
    public readonly repository: Repository<NotifyTemplate>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async getPage({ pageNo, pageSize, orderBy, code, name, status, createTime }) {
    const skip = (pageNo - 1) * pageSize;
    const where = {};
    if (name) {
      where['name'] = Like(`%${name}%`);
    }
    if (code) {
      where['code'] = code;
    }
    if (!_.isEmpty(status)) {
      where['status'] = status;
    }
    if (createTime?.length === 2 && createTime[0] && createTime[1]) {
      where['createTime'] = Between(createTime[0], createTime[1]);
    }
    return await this.repository.findAndCount({
      where,
      order: {
        [orderBy || 'id']: 'ASC',
      },
      skip,
      take: pageSize,
    });
  }
}
