import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AdminDto } from '../../../dto/system/adminDto';
import { ToolsService } from '../../tools/tools.service';
import { AzLogger } from '../../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

import {
  Brackets,
  In,
  InsertResult,
  Like,
  MongoRepository,
  Repository,
} from 'typeorm';
import { Admin } from '../../../entity/system/adminEntity';
import { plainToInstance } from 'class-transformer';
import * as _ from 'lodash';
import { generatePassword } from '../../../common/utils/utils';
import { DestoryDto } from '../../../dto/commonDto';
@Injectable()
export class UserService {
  constructor(
    private toolsService: ToolsService,
    private logger: AzLogger,
    @InjectRepository(Admin)
    public readonly adminRepository: MongoRepository<Admin>,
  ) {}

  async add(userDto: AdminDto) {
    const model = plainToInstance(Admin, userDto);
    model.salt = bcrypt.genSaltSync();
    model.password = await generatePassword(model.password, model.salt);
    try {
      return await this.adminRepository.save(model);
    } catch (error) {
      this.logger.error(error, '添加用户失败');
      console.log(error);
      if (error.errno === 1062) {
        throw new NotAcceptableException('用户名、邮箱、手机号码重复');
      } else {
        throw new NotAcceptableException('发生未知错误');
      }
    }
  }

  async updatePassword(id, cond: any) {
    try {
      const user = await this.adminRepository.findOneBy({
        _id: new ObjectId(id),
      });
      user.password = await generatePassword(cond.password, user.salt);
      user.updater = cond.userId;
      await this.adminRepository.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: user.password, updator: cond.userName } },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(user: any) {
    return await this.adminRepository.findOneBy({
      deleted: null,
      $or: [
        { userName: user.userName },
        { mobile: user.userName },
        { email: user.userName },
      ],
    });
  }

  async getPage({
    pageNo = 1,
    pageSize = 10,
    mobile = '',
    status,
    deptId,
    userName,
    createTime,
  }): Promise<[Admin[], number]> {
    const where = {
      deleted: null,
    };
    if (deptId) {
      where['deptId'] = deptId;
    }
    if (!_.isEmpty(status)) {
      where['status'] = +status;
    }
    if (mobile) {
      where['mobile'] = mobile;
    }
    if (userName) {
      where['userName'] = new RegExp(userName, 'i');
    }
    if (createTime?.length == 2 && createTime[0] && createTime[1]) {
      where['createTime'] = {
        $gte: createTime[0],
        $lte: createTime[1],
      };
    }
    const [admins, count] = await this.adminRepository.findAndCount({
      where,
      skip: (pageNo - 1) * pageSize,
      take: +pageSize,
    });
    return [admins, count];
  }
  async listAllSimple() {
    const users = await this.adminRepository.find({
      deleted: null,
    });
    return _.map(users, (user) => {
      return {
        id: user.id,
        nickName: user.nickName,
      };
    });
  }
  async getById(id: ObjectId): Promise<Admin> {
    return await this.adminRepository.findOneBy({
      _id: new ObjectId(id),
    });
  }

  async save(model: Admin): Promise<Admin> {
    return await this.adminRepository.save(model);
  }
  async destroy(id) {
    const model = {
      id: new ObjectId(id),
      deleted: new Date(),
    } as DestoryDto;
    return await this.adminRepository.save(model);
  }

  async listUserRoles(id: string) {
    const user = await this.adminRepository.findOneBy({
      _id: new ObjectId(id),
      deleted: null,
    });
    if (!user?.roleIds?.length) {
      return [];
    }
    return user.roleIds;
  }
}
