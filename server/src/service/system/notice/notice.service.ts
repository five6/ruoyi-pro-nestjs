import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, MongoRepository, Repository } from 'typeorm';
import { Notice } from '../../../entity/system/noticeEntity';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { DestoryDto } from '../../../dto/commonDto';
import * as _ from 'lodash';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    public readonly repository: MongoRepository<Notice>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async getPage({
    pageNo = 1,
    pageSize = 10,
    title = '',
    status,
  }): Promise<[Notice[], number]> {
    const where = {
      deleted: null,
    } as any;
    if (!_.isEmpty(status)) {
      where['status'] = +status;
    }

    if (title) {
      where['title'] = new RegExp(title, 'i');
    }

    const [roles, count] = await this.repository.findAndCount({
      where,
      skip: (pageNo - 1) * pageSize,
      take: +pageSize,
      order: {
        createTime: 1,
      },
    });
    return [roles, count];
  }

  async save(model: any, userName) {
    const notice: any = plainToInstance(Notice, model);
    if (notice.id) {
      notice.updater = userName;
      notice.id = new ObjectId(notice.id);
    } else {
      notice.creator = userName;
    }
    return await this.repository.save(notice);
  }

  async findOne(id: string): Promise<any> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async delete({ id, userName }) {
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
      updater: userName,
    } as DestoryDto;
    return await this.repository.save(model);
  }
}
