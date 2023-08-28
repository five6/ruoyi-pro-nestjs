import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from 'src/common/constants/error.constants';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import * as _ from 'lodash';
import { Pagination } from 'src/common/result-beans/Pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { Notice } from '../../../entity/system/noticeEntity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    public readonly repository: Repository<Notice>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async getPage(
    page = 1,
    pageSize = 10,
    keywords = '',
    orderBy = '',
  ): Promise<[Notice[], number]> {
    return await this.repository.findAndCount({
      where: [{ title: Like('%' + keywords + '%') }],
      order: {
        id: 'ASC',
      },
      select: ['title', 'type', 'content', 'id', 'status', 'createTime'],
      skip: page - 1,
      take: pageSize,
    });
  }

  async add(body: any) {
    try {
      const notice = plainToInstance(Notice, body);
      return await this.repository.save(notice);
    } catch (error) {
      this.logger.error(error.message, '');
      throw new Error('保存失败');
    }
  }

  async update(json: any) {
    try {
      const { id, ...body } = json;
      delete body.deleted;
      delete body.status;
      const notice = plainToInstance(Notice, body);
      return await this.repository.update(id, notice);
    } catch (error) {
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const options: FindOneOptions = {
        where: {
          deleted: 0,
          id: id,
        },
      };
      return await this.repository.findOne(options);
    } catch (error) {
      return null;
    }
  }

  async delete(cond): Promise<void> {
    try {
      await this.repository.update(
        { id: cond.id },
        { deleted: 1, updater: cond.userId },
      );
    } catch (error) {
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }

  async updateStatus(json: any): Promise<void> {
    try {
      await this.repository.update(
        { id: json.id },
        {
          status: json.status,
          updater: json.userId,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }
}
