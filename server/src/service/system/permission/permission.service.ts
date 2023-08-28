import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { RoleService } from '../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../../../entity/system/menuEntity';
import * as _ from 'lodash';
import { AssignRoleMenuDto } from '../../../dto/system/assignRoleMenuDto';
import { AssignUserRoleDto } from '../../../dto/system/assignUserRoleDto';
import { UserRole } from '../../../entity/system/userRoleEntity';
import { plainToInstance } from 'class-transformer';
import { RoleMenu } from '../../../entity/system/roleMenuEntity';

@Injectable()
export class PermissionService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(Menu)
    public readonly repository: Repository<Menu>,
    private readonly toolService: ToolsService,
    private readonly roleService: RoleService,
    @InjectRepository(UserRole)
    public readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(RoleMenu)
    public readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}
  async listRoleResources(roleId: number): Promise<number[]> {
    const list = await this.roleMenuRepository.find({
      where: {
        roleId: roleId,
      },
      order: {
        id: 'DESC',
      },
    });
    return _.map(list, (item) => {
      return item.menuId;
    });
  }
  async assignRoleMenu(dto: AssignRoleMenuDto, req) {
    await this.roleMenuRepository.queryRunner?.startTransaction();
    try {
      // 查询角色菜单
      const roleMenus = await this.roleMenuRepository.find({
        where: {
          roleId: dto.roleId,
        },
      });
      let result;
      const allOldMenuIds = [];
      // 过滤新增和删除菜单
      // 新增的菜单不包含老的，删除老的
      const needDeleteMenusIds = [];
      _.each(roleMenus, (roleMenu) => {
        allOldMenuIds.push(roleMenu.menuId);
        if (!dto.menuIds.includes(roleMenu.menuId)) {
          needDeleteMenusIds.push(roleMenu.id);
        }
      });
      const newMenusMenuIds = [];
      _.each(dto.menuIds, (menuId) => {
        if (!allOldMenuIds.includes(menuId)) {
          newMenusMenuIds.push(menuId);
        }
      });
      // 删除之前的角色菜单
      if (needDeleteMenusIds.length) {
        await this.roleMenuRepository.delete(needDeleteMenusIds);
      }
      // 插入新的菜单
      const records = newMenusMenuIds.map((item) => {
        const roleMenu = plainToInstance(RoleMenu, {
          roleId: dto.roleId,
          menuId: item,
          creator: req.user.userName,
          updater: req.user.userName,
        });
        return roleMenu;
      });
      if (records.length) {
        result = await this.roleMenuRepository
          .createQueryBuilder()
          .insert()
          .values(records)
          .execute();
        await this.roleMenuRepository.queryRunner?.commitTransaction();
        await this.roleMenuRepository.createQueryBuilder().useTransaction(true);
      }
      return [result?.identifiers?.length];
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.roleMenuRepository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return [0];
    }
  }

  async assignUserRole(dto: AssignUserRoleDto, req) {
    await this.userRoleRepository.queryRunner?.startTransaction();
    try {
      // 查询用户角色
      const userRoles = await this.userRoleRepository.find({
        where: {
          userId: dto.userId,
        },
      });
      const userRoleIds = [];
      _.each(userRoles, (userRole) => {
        userRoleIds.push(userRole.id);
      });
      // 删除之前的用户角色
      if (userRoleIds.length) {
        await this.userRoleRepository.softDelete(userRoleIds);
      }
      // 插入新的角色
      const records = dto.roleIds.map((item) => {
        const userRole = plainToInstance(UserRole, {
          userId: dto.userId,
          roleId: item,
          creator: req.user.userName,
          updater: req.user.userName,
        });
        return userRole;
      });
      const result = await this.userRoleRepository
        .createQueryBuilder()
        .insert()
        .values(records)
        .execute();
      await this.userRoleRepository.queryRunner?.commitTransaction();
      await this.userRoleRepository.createQueryBuilder().useTransaction(true);
      return [result.identifiers.length];
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.userRoleRepository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return [0];
    }
  }
}
