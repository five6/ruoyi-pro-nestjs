import { Injectable } from '@nestjs/common';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { RoleService } from '../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../../../entity/system/menuEntity';
import { AssignRoleMenuDto } from '../../../dto/system/assignRoleMenuDto';
import { AssignUserRoleDto } from '../../../dto/system/assignUserRoleDto';
import { UserService } from '../user/user.service';
import { ObjectId } from 'mongodb';
import { Role } from '../../../entity/system/roleEntity';
@Injectable()
export class PermissionService {
  constructor(
    private logger: AzLogger,
    @InjectRepository(Menu)
    public readonly repository: Repository<Menu>,
    private readonly toolService: ToolsService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}
  async listRoleResources(roleId: string) {
    const role = await this.roleService.repository.findOneBy({
      _id: new ObjectId(roleId),
      deleted: null,
    });
    return role?.menuIds || [];
  }
  async assignRoleMenu(dto: AssignRoleMenuDto, req) {
    const model = {} as any;
    model.menuIds = dto.menuIds;
    model.id = new ObjectId(dto.roleId);
    return this.roleService.repository.save(model);
  }

  async assignUserRole(dto: AssignUserRoleDto, req) {
    return await this.userService.adminRepository.updateOne(
      {
        _id: new ObjectId(dto.userId),
      },
      {
        $set: {
          updater: req.user.userName,
          roleIds: dto.roleIds,
        },
      },
    );
  }
}
