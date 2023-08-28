import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, InsertResult, Like, Repository } from 'typeorm';
import { Dept } from '../../../entity/system/deptEntity';
import { DictType } from '../../../entity/system/dictTypeEntity';
import { DictData } from '../../../entity/system/dictDataEntity';
import * as _ from 'lodash';
import { PageDto } from '../../../dto/commonDto';
import { Role } from '../../../entity/system/roleEntity';
import { DictDataPageDto } from '../../../dto/system/dictDataPageDto';
import { DictTypePageDto } from '../../../dto/system/dictTypePageDto';
@Injectable()
export class DictService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(DictType)
    public readonly dictTypeRepository: Repository<DictType>,
    @InjectRepository(DictData)
    public readonly dictDataRepository: Repository<DictData>,
  ) {}

  //#region  基础控制器
  // 初始化数据
  async seedData(): Promise<number[]> {
    let result: InsertResult;
    let result1: InsertResult;
    await this.dictTypeRepository.queryRunner?.startTransaction();
    try {
      await this.dictTypeRepository.clear();
      result = await this.dictTypeRepository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      result1 = await this.dictTypeRepository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      await this.dictTypeRepository.queryRunner?.commitTransaction();
      await this.dictTypeRepository.createQueryBuilder().useTransaction(true);
      return [result.identifiers.length, result1.identifiers.length];
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.dictTypeRepository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return [0, 0];
    }
  }

  async listAllDataSimple() {
    const data = await this.dictDataRepository.find();
    return _.map(data, (item) => {
      return {
        dictType: item.dictType,
        value: item.value,
        label: item.label,
        colorType: item.colorType,
        cssClass: item.cssClass,
      };
    });
  }

  async listAllTypeSimple() {
    const type = await this.dictTypeRepository.find();
    return _.map(type, (item) => {
      return _.pick(item, ['id', 'name', 'type', 'remark']);
    });
  }
  async typePage(dto: DictTypePageDto): Promise<[DictType[], number]> {
    const skip = (dto.pageNo - 1) * dto.pageSize;
    return await this.dictTypeRepository.findAndCount({
      where: {
        name: Like('%' + dto.name + '%'),
        type: Like('%' + dto.type + '%'),
        status: dto.status,
        createTime:
          dto.createTime?.length == 2 && dto.createTime[0] && dto.createTime[1]
            ? Between(dto.createTime[0], dto.createTime[1])
            : null,
      },
      order: {
        id: 'ASC',
      },
      skip: skip,
      take: dto.pageSize,
    });
  }

  async dataPage(dto: DictDataPageDto): Promise<[DictData[], number]> {
    const skip = (dto.pageNo - 1) * dto.pageSize;
    const where = {
      dictType: Like('%' + dto.dictType + '%'),
      label: dto.label,
      status: dto.status,
    };
    if (dto.label == '') {
      delete where.label;
    }
    if (dto.status == undefined) {
      delete where.status;
    }
    return await this.dictDataRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: skip,
      take: dto.pageSize,
    });
  }

  async destroy(id: number) {
    return await this.dictDataRepository.softDelete(id);
  }
}
