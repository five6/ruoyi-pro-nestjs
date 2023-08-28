import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, Repository } from 'typeorm';
import { Dept } from '../../../entity/system/deptEntity';
import * as _ from 'lodash';
import { DeptOption } from '../../../common/result-beans/rsp/DeptOption';

@Injectable()
export class DeptService {
  constructor(
    private logger: AzLogger,
    private readonly toolService: ToolsService,
    @InjectRepository(Dept)
    public readonly repository: Repository<Dept>,
  ) {}

  //#region  基础控制器
  // 初始化数据
  async seedData(): Promise<number[]> {
    let result: InsertResult;
    let result1: InsertResult;
    await this.repository.queryRunner?.startTransaction();
    try {
      await this.repository.clear();
      result = await this.repository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      result1 = await this.repository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return [result.identifiers.length, result1.identifiers.length];
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return [0, 0];
    }
  }
  async getPage(
    page = 1,
    pageSize = 10,
    keywords = '',
    orderBy = '',
  ): Promise<[Dept[], number]> {
    return await this.repository.findAndCount({
      where: [{ name: Like('%' + keywords + '%') }],
      order: {
        id: 'ASC',
      },
      skip: page - 1,
      take: pageSize,
    });
  }
  async getList(): Promise<DeptOption[]> {
    const list = await this.repository.find();
    return _.map(list, (item) => {
      return new DeptOption(item.id, item.name, item.parentId);
    });
  }
  async getById(id: number): Promise<Dept> {
    return await this.repository.findOne({ where: { id: id } });
  }
  async getByIds(ids: number[]): Promise<Dept[]> {
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }
  async save(model: Dept): Promise<boolean> {
    await this.repository.queryRunner?.startTransaction();
    try {
      //如果是编辑先删除主子表后，修改主表，新增子表
      if (model.id > 0) {
        await this.repository
          .createQueryBuilder()
          .update()
          .set({
            name: model.name,
            sort: model.sort,
            parentId: model.parentId,
            status: model.status,
            mobile: model.mobile,
            email: model.email,
            leaderUserId: model.leaderUserId,
          })
          .where('id = :id', { id: model.id })
          .execute();
      } else {
        await this.repository
          .createQueryBuilder()
          .insert()
          .values(model)
          .execute();
      }
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return true;
    } catch (err) {
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return false;
    }
  }
  async destroy(id: number) {
    return await this.repository.softDelete(id);
  }
}
