import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, MongoRepository, Repository } from 'typeorm';
import { Dept } from '../../../entity/system/deptEntity';
import * as _ from 'lodash';
import { DeptOption } from '../../../common/result-beans/rsp/DeptOption';
import { DestoryDto } from '../../../dto/commonDto';
import { ObjectId } from 'mongodb';
@Injectable()
export class DeptService {
  constructor(
    private logger: AzLogger,
    private readonly toolService: ToolsService,
    @InjectRepository(Dept)
    public readonly repository: MongoRepository<Dept>,
  ) {}

  async getPage({
    pageNo = 1,
    pageSize = 10,
    name = '',
    status,
  }): Promise<[Dept[], number]> {
    const where = {
      deleted: null,
    };
    if (!_.isEmpty(status)) {
      where['status'] = +status;
    }
    if (name) {
      where['name'] = new RegExp(name, 'i');
    }
    return await this.repository.findAndCount({
      skip: (pageNo - 1) * pageSize,
      take: +pageSize,
      order: {
        sort: 1,
      },
    });
  }
  async getList(): Promise<DeptOption[]> {
    const list = await this.repository.find({
      deleted: null,
    });
    return _.map(list, (item) => {
      return new DeptOption(item.id, item.name, item.parentId);
    });
  }
  async getById(id): Promise<Dept> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async save(model: any) {
    if (model.id) {
      model.id = new ObjectId(model.id);
    }
    return this.repository.save(model);
  }
  async destroy(id) {
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.repository.save(model);
  }
}
