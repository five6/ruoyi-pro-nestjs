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
import { Tenant } from 'src/entity/system/tenantEntity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    public readonly repository: Repository<Tenant>,
    private logger: AzLogger,
  ) {}

  async getPage(
    page = 1,
    pageSize = 10,
    keywords = '',
    orderBy = '',
  ): Promise<[Tenant[], number]> {
    return await this.repository.findAndCount({
      where: [],
      order: {
        id: 'ASC',
      },
      skip: page - 1,
      take: pageSize,
    });
  }

  async findOne(id): Promise<any> {
    try {
      return await this.repository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }

  async save(model: Tenant, user) {
    await this.repository.queryRunner?.startTransaction();
    try {
      if (model.id > 0) {
        model.updater = user.userName;
        await this.repository
          .createQueryBuilder()
          .update()
          .set(model)
          .where('id = :id', { id: model.id })
          .execute();
      } else {
        model.creator = user.userName;
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
}
