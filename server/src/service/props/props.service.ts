import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from '../../common/constants/error.constants';
import { AzLogger } from '../logger/logger.service';
import { ToolsService } from '../tools/tools.service';
import { Pagination } from '../../common/result-beans/Pagination';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Props } from '../../entity/game/propsEntity';
import { plainToInstance } from 'class-transformer';
import { Menu } from '../../entity/system/menuEntity';

@Injectable()
export class PropsService {
  constructor(
    @InjectRepository(Props)
    public readonly model: Repository<Props>,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async find(json: any, fields?: string, pagination?: Pagination) {
    try {
      const cond: any = { deleted: 0 };
      if (!_.isEmpty(json.status)) {
        cond.status = json.status;
      }
      if (!_.isEmpty(json.name)) {
        cond.name = Like(`%${json.name}%`);
      }
      const query = this.model.createQueryBuilder().where(cond);
      const skip = (pagination.pageNo - 1) * pagination.pageSize;
      const [result, totalCount] = await query
        .select(fields)
        .orderBy('id', 'DESC')
        .skip(skip)
        .take(pagination.pageSize)
        .getManyAndCount();
      return [result, totalCount];
    } catch (error) {
      return [[], 0];
    }
  }

  async add(body: any) {
    try {
      const props = plainToInstance(Props, body);
      return await this.model.save(props);
    } catch (error) {
      this.logger.error(error.message, error);
      throw new Error();
    }
  }

  async update(json: any) {
    try {
      const { id, ...body } = json;
      const menu = plainToInstance(Menu, body);
      return await this.model.update({ id: id }, menu);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }

  async options(name: string) {
    const queryBuilder = this.model.createQueryBuilder('entity');
    if (!_.isEmpty(name)) {
      queryBuilder.where('entity.name LIKE :name', { name: `%${name}%` });
    }
    queryBuilder.select(['entity.id', 'entity.name', 'entity.description']);
    queryBuilder.orderBy('entity.id', 'DESC');
    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    try {
      return await this.model.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: number) {
    try {
      await this.model.softDelete(id);
    } catch (error) {
      return null;
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
    } catch (error) {
      return null;
    }
  }
}
