import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { RoleService } from '../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Like, Repository } from 'typeorm';
import { Menu } from '../../../entity/system/menuEntity';
import * as _ from 'lodash';
import { MenuOption } from '../../../common/result-beans/rsp/DeptOption';
import { errors } from '../../../common/constants/error.constants';
@Injectable()
export class MenuService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(Menu)
    public readonly repository: Repository<Menu>,
    private readonly toolService: ToolsService,
    private readonly roleService: RoleService,
  ) {}
  //#region  基础控制器
  // 初始化数据
  async seedData(): Promise<number> {
    let result: InsertResult;
    await this.repository.queryRunner?.startTransaction();
    try {
      await this.repository.clear();
      result = await this.repository
        .createQueryBuilder()
        .insert()
        .values([])
        .execute();
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return result.identifiers.length;
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return 0;
    }
  }
  async getPage(
    page = 1,
    pageSize = 10,
    keywords = '',
  ): Promise<[Menu[], number]> {
    return await this.repository.findAndCount({
      where: [{ name: Like('%' + keywords + '%') }],
      order: {
        id: 'DESC',
      },
      skip: page - 1,
      take: pageSize,
    });
  }

  async getList() {
    return await this.repository.find({
      where: {},
      order: {
        id: 'DESC',
      },
    });
  }

  async getSimpleList(): Promise<MenuOption[]> {
    const list = await this.repository.find({
      where: {},
      order: {
        id: 'DESC',
      },
    });
    return _.map(list, (item) => {
      return new MenuOption(item.id, item.name, item.type, item.parentId);
    });
  }
  async getById(id: number): Promise<Menu> {
    return await this.repository.findOne({ where: { id: id } });
  }
  async getByIds(ids: number[]): Promise<Menu[]> {
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }
  async save(model: Menu): Promise<Menu> {
    return await this.repository.save(model);
  }
  async destroy(id: number) {
    const count = await this.repository.count({
      where: {
        parentId: id,
      },
    });
    // 校验是否还有子菜单
    if (count > 0) {
      throw new HttpException(
        errors.MENU_EXISTS_CHILDREN,
        HttpStatus.FORBIDDEN,
      );
    }
    const exists = await this.repository.findOne({
      where: {
        parentId: id,
      },
    });
    // // 校验删除的菜单是否存在
    if (exists == null) {
      throw new HttpException(errors.MENU_NOT_EXISTS, HttpStatus.FORBIDDEN);
    }
    await this.repository.queryRunner?.startTransaction();
    try {
      //删除主子表
      // // 标记删除
      await this.repository.softDelete(id);
      // // 删除授予给角色的权限
      await this.roleService.roleMenuRepository.softDelete({ menuId: id });
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
