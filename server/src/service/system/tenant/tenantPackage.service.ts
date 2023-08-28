import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from 'src/common/constants/error.constants';
import { AzLogger } from '../../logger/logger.service';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { TenantPackage } from 'src/entity/system/tenantPackageEntity';

@Injectable()
export class TenantPackageService {
  constructor(
    @InjectRepository(TenantPackage)
    public readonly repository: Repository<TenantPackage>,
    private logger: AzLogger,
  ) {}

  async getPage(): Promise<[TenantPackage[], number]> {
    return await this.repository.findAndCount({
      where: [],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id): Promise<any> {
    try {
      const item = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!item) return null;
      (item as any).menuIds = _.split(item.menuIds, ',');
      return item;
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

  async save(model: TenantPackage, user) {
    await this.repository.queryRunner?.startTransaction();
    try {
      model.menuIds = model.menuIds + '';
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
