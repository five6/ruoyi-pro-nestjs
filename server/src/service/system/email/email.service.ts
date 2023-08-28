import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import * as _ from 'lodash';
import { Pagination } from 'src/common/result-beans/Pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Email } from '../../../entity/game/emailEntity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    public readonly model: Repository<Email>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async find(json: any, fields?: string, pagination?: Pagination) {
    try {
      const cond: any = { deleted: 0 };
      if (!_.isEmpty(json.status)) {
        cond.status = json.status;
      }
      if (json.to) {
        cond.to = json.to;
      }
      if (!_.isEmpty(json.title)) {
        cond.title = Like(`%${json.title}%`);
      }
      if (json.propsId) {
        cond.props = In([json.propsId]);
      }
      const query = this.model.createQueryBuilder('entity').where(cond);

      if (pagination) {
        const skip = (pagination.pageNo - 1) * pagination.pageSize;
        const [result, totalCount] = await query
          .select(fields)
          .orderBy('entity.id', 'DESC')
          .skip(skip)
          .take(pagination.pageSize)
          .getManyAndCount();
        return [result, totalCount];
      } else {
        const result = await query
          .select(fields)
          .orderBy('entity.id', 'DESC')
          .getMany();
        return [result, result.length];
      }
    } catch (error) {
      return [[], 0];
    }
  }

  async add(body: any) {
    try {
      const userIds = this.toolService.convertTextToArray(body.to);
      const to = userIds.map((userId: string) => ({
        id: userId,
      }));
      const model = this.model.create({
        ...body,
        to,
      });
      return await this.model.save(model);
    } catch (error) {
      this.logger.error(error.message, '');
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(json: any) {
    try {
      const { id, ...body } = json;
      delete body.deleted;
      delete body.status;
      const userIds = this.toolService.convertTextToArray(body.to);
      const to = userIds.map((userId: string) => ({
        id: userId,
      }));
      return await this.model.update(id, {
        ...body,
        to,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id) {
    try {
      return await this.model.findOne({
        where: {
          status: 1,
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string) {
    try {
      return await this.model.softDelete(id);
    } catch (error) {
      return false;
    }
  }

  async updateStatus(json: any) {
    try {
      await this.model.update(
        { id: json.id },
        {
          status: json.status,
          updater: json.userId,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
