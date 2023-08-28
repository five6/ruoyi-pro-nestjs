import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  In,
  InsertResult,
  Like,
  MongoRepository,
  Repository,
} from 'typeorm';
import { Dept } from '../../../entity/system/deptEntity';
import { DictType } from '../../../entity/system/dictTypeEntity';
import { DictData } from '../../../entity/system/dictDataEntity';
import * as _ from 'lodash';
import { DictDataPageDto } from '../../../dto/system/dictDataPageDto';
import { DictTypePageDto } from '../../../dto/system/dictTypePageDto';
import { ObjectId } from 'mongodb';
import { DestoryDto } from '../../../dto/commonDto';
@Injectable()
export class DictService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(DictType)
    public readonly dictTypeRepository: MongoRepository<DictType>,
    @InjectRepository(DictData)
    public readonly dictDataRepository: MongoRepository<DictData>,
  ) {}

  async listAllDataSimple() {
    const data = await this.dictDataRepository.find({ deleted: null });
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
    const type = await this.dictTypeRepository.find({ deleted: null });
    return _.map(type, (item) => {
      return _.pick(item, ['id', 'name', 'type', 'remark']);
    });
  }
  async typePage({
    pageNo,
    pageSize,
    name = '',
    type = '',
    status,
    createTime,
  }) {
    const where = {
      deleted: null,
    };
    if (type) {
      where['type'] = type;
    }
    if (!_.isEmpty(status)) {
      where['status'] = +status;
    }
    if (name) {
      where['name'] = new RegExp(name, 'i');
    }
    if (createTime?.length == 2 && createTime[0] && createTime[1]) {
      where['createTime'] = {
        $gte: createTime[0],
        $lte: createTime[1],
      };
    }
    const [dicTypes, count] = await this.dictTypeRepository.findAndCount({
      where,
      skip: (pageNo - 1) * pageSize,
      take: +pageSize,
    });
    return [dicTypes, count];
  }

  async dataPage(dto: DictDataPageDto): Promise<[DictData[], number]> {
    const skip = (dto.pageNo - 1) * dto.pageSize;
    const where = { deleted: null } as any;
    if (dto.dictType) {
      where['dictType'] = dto.dictType;
    }
    if (dto.label) {
      where['label'] = dto.label;
    }
    if (!_.isEmpty(dto.status)) {
      where['status'] = +dto.status;
    }
    const [dicData, count] = await this.dictDataRepository.findAndCount({
      where,
      skip: skip,
      take: +dto.pageSize,
    });
    return [dicData, count];
  }

  async destroyType(id) {
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.dictTypeRepository.save(model);
  }

  async destroyData(id) {
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.dictDataRepository.save(model);
  }
}
