import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AdminDto } from '../../../dto/system/adminDto';
import { ToolsService } from '../../tools/tools.service';
import { AzLogger } from '../../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, InsertResult, Like, Repository } from 'typeorm';
import { Admin } from '../../../entity/system/adminEntity';
import { plainToInstance } from 'class-transformer';
import * as _ from 'lodash';
import { UserRole } from '../../../entity/system/userRoleEntity';
@Injectable()
export class AdminService {
  constructor(
    private toolsService: ToolsService,
    private logger: AzLogger,
    @InjectRepository(Admin)
    public readonly adminRepository: Repository<Admin>,

    @InjectRepository(UserRole)
    public readonly userRoleRepository: Repository<UserRole>,
  ) {}
  async validateAccount(validateToken: string) {
    const u = await this.adminRepository.findOne({
      where: {
        validateToken: validateToken,
      },
    });
    if (!u) throw new NotFoundException('找不到此用户，请联系管理员！');
    else if (
      new Date().getTime() - new Date(u.createTime).getTime() >
      86400000
    ) {
      throw new NotAcceptableException(
        '注册时长超过一天，不允许激活。请联系管理员！',
      );
    } else {
      const admin = new Admin();
      admin.validateToken = null;
      admin.id = u.id;
      return await this.adminRepository.save(u);
    }
  }
  async add(userDto: AdminDto) {
    const model = plainToInstance(Admin, userDto);
    model.salt = model.makeSalt();
    model.password = model.encryptPassword(model.password);
    model.validateToken = await this.toolsService.getRandomUrlString();
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
      const user = await this.adminRepository.findOne(id);
      user.password = user.encryptPassword(cond.password);
      user.updater = cond.userId;
      await this.adminRepository.save(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(user: any) {
    return await this.adminRepository.findOne({
      where: [{ userName: user.userName }],
    });
  }

  async seedData(): Promise<number> {
    let result: InsertResult;
    await this.adminRepository.queryRunner?.startTransaction();
    try {
      await this.adminRepository.clear();
      result = await this.adminRepository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      await this.adminRepository.queryRunner?.commitTransaction();
      await this.adminRepository.createQueryBuilder().useTransaction(true);
      return result.identifiers.length;
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.adminRepository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return 0;
    }
  }
  async getPage(
    page = 1,
    pageSize = 10,
    keywords = '',
    orderBy = '',
    deptId: number,
  ): Promise<[Admin[], number]> {
    const query = this.adminRepository.createQueryBuilder('admin');

    if (deptId) {
      query.andWhere('admin.deptId = :deptId', { deptId });
    }

    if (keywords !== '') {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('admin.mobile LIKE :keywords', { keywords: `%${keywords}%` })
            .orWhere('admin.userName LIKE :keywords', {
              keywords: `%${keywords}%`,
            })
            .orWhere('admin.nickName LIKE :keywords', {
              keywords: `%${keywords}%`,
            });
        }),
      );
    }

    const [admins, count] = await query
      .orderBy('admin.id', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return [admins, count];
  }
  async listAllSimple() {
    const users = await this.adminRepository.find();
    return _.map(users, (user) => {
      return {
        id: user.id,
        nickName: user.nickName,
      };
    });
  }
  async getById(id: number): Promise<Admin> {
    return await this.adminRepository.findOne({
      where: { id: id },
      select: [
        'avatar',
        'birthday',
        'createTime',
        'creator',
        'idCard',
        'deptId',
        'email',
        'mobile',
        'id',
        'sex',
        'nickName',
        'userName',
        'tenantId',
        'remark',
      ],
    });
  }
  async getByIds(ids: number[]): Promise<Admin[]> {
    return await this.adminRepository.find({
      where: { id: In(ids) },
    });
  }
  async save(model: Admin): Promise<Admin> {
    return await this.adminRepository.save(model);
  }
  async destroy(id: number) {
    return await this.adminRepository.softDelete(id);
  }

  async listUserRoles(id: number) {
    return await this.userRoleRepository.find({
      where: {
        userId: id,
      },
    });
  }
}
