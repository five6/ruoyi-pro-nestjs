import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, Repository } from 'typeorm';
import { Role } from '../../../entity/system/roleEntity';
import { RoleMenu } from '../../../entity/system/roleMenuEntity';
import { Menu } from '../../../entity/system/menuEntity';
import { UserRole } from '../../../entity/system/userRoleEntity';
import { errors } from '../../../common/constants/error.constants';
import { RoleTypeEnum } from '../../../Enum/Global';

@Injectable()
export class RoleService {
  constructor(
    private readonly logger: AzLogger,

    @InjectRepository(Role)
    public readonly repository: Repository<Role>,

    @InjectRepository(RoleMenu)
    public readonly roleMenuRepository: Repository<RoleMenu>,

    @InjectRepository(Menu)
    public readonly menuModel: Repository<Menu>,

    @InjectRepository(UserRole)
    public readonly userRoleRepository: Repository<UserRole>,
  ) {}
  //根据角色Id获得路由菜单
  async getMenusByRoleId(id: number): Promise<RoleMenu[]> {
    //根据角色Id获得角色菜单映射数据
    return await this.roleMenuRepository.find({
      where: { roleId: id },
    });
  }
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
      result1 = await this.roleMenuRepository
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
  ): Promise<[Role[], number]> {
    return await this.repository.findAndCount({
      where: [{ name: Like('%' + keywords + '%') }],
      order: {
        id: 'ASC',
      },
      skip: page - 1,
      take: pageSize,
    });
  }
  async getList(): Promise<Role[]> {
    const result = await this.repository.find({
      where: {},
      order: {
        id: 'ASC',
      },
    });
    for await (const item of result) {
      const roleMenuResult = await this.roleMenuRepository.find({
        where: { roleId: item.id },
      });
      item.sysRoleMenu = roleMenuResult;
    }
    return result;
  }
  async getById(id: number): Promise<Role> {
    const result = await this.repository.findOne({ where: { id: id } });
    return result;
  }
  async getByIds(ids: number[]): Promise<Role[]> {
    const result = await this.repository.find({
      where: { id: In(ids) },
    });
    return result;
  }
  async save(model: Role): Promise<boolean> {
    await this.repository.queryRunner?.startTransaction();
    try {
      if (model.id > 0) {
        await this.repository
          .createQueryBuilder()
          .update()
          .set({ name: model.name, remark: model.remark, status: model.status })
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
  async destroy(id: number): Promise<boolean> {
    const record = await this.repository.findOne({ where: { id: id } });
    if (!record) {
      throw new HttpException(errors.ROLE_NOT_EXISTS, HttpStatus.FORBIDDEN);
    }
    if (record.type == RoleTypeEnum.SYSTEM) {
      throw new HttpException(
        errors.SYSTEM_ROLE_CANT_DELETE,
        HttpStatus.FORBIDDEN,
      );
    }
    await this.repository.queryRunner?.startTransaction();
    try {
      //删除主子表
      // 删除主表
      await this.repository.softDelete({ id: id });
      // 删除 UserRole
      await this.userRoleRepository.softDelete({ roleId: id });
      // 删除 RoleMenu
      await this.roleMenuRepository.softDelete({ roleId: id });
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
