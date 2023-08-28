import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, MongoRepository, Repository } from 'typeorm';
import { Role } from '../../../entity/system/roleEntity';
import { Menu } from '../../../entity/system/menuEntity';
import { errors } from '../../../common/constants/error.constants';
import { CommonStatusEnum, RoleTypeEnum } from '../../../Enum/Global';
import { ObjectId } from 'mongodb';
import { UserService } from '../user/user.service';
import { DestoryDto } from '../../../dto/commonDto';
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    private readonly logger: AzLogger,
    private userService: UserService,
    @InjectRepository(Role)
    public readonly repository: MongoRepository<Role>,

    @InjectRepository(Menu)
    public readonly menuModel: MongoRepository<Menu>,
  ) {}
  async getPage({
    pageNo = 1,
    pageSize = 10,
    code = '',
    name = '',
    status,
    createTime,
  }): Promise<[Role[], number]> {
    const where = {
      deleted: null,
    };
    if (code) {
      where['code'] = code;
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
    const [roles, count] = await this.repository.findAndCount({
      where,
      skip: (pageNo - 1) * pageSize,
      take: +pageSize,
      order: {
        sort: 1,
      },
    });
    return [roles, count];
  }
  async getList(): Promise<Role[]> {
    const result = await this.repository.find({
      where: {
        deleted: null,
      },
      order: {
        id: 'ASC',
      },
    });
    return result;
  }
  async getById(id): Promise<Role> {
    const result = await this.repository.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return result;
  }

  async getByIds(ids: string[]): Promise<Role[]> {
    if (!ids?.length) return [];
    const result = await this.repository.find({
      where: {
        _id: { $in: _.map(ids, (id) => new ObjectId(id)) },
      },
    });
    return result;
  }

  async save(model: any, userName) {
    if (model.id) {
      const objectId = new ObjectId(model.id);
      const dbItem = await this.repository.findOneBy({
        _id: objectId,
      });
      model.menuIds = dbItem?.menuIds;
      model.updater = userName;
      model.id = objectId;
    } else {
      model.creator = userName;
    }
    return await this.repository.save(model);
  }
  async destroy(id) {
    const users = await this.userService.adminRepository.find({
      roleIds: {
        $elemMatch: { $eq: id },
      },
      deleted: null,
    });
    if (users?.length) {
      throw new HttpException(errors.ROLE_CANT_DELETE, HttpStatus.FORBIDDEN);
    }
    // 内置角色不能删除
    const dbItem = await this.repository.findOneBy({ _id: new ObjectId(id) });
    if (dbItem?.type == RoleTypeEnum.SYSTEM) {
      throw new HttpException(
        errors.SYSTEM_ROLE_CANT_DELETE,
        HttpStatus.FORBIDDEN,
      );
    }
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.repository.save(model);
  }
}
