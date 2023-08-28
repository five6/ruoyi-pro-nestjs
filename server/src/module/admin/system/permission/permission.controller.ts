import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Config } from '../../../../common/config/config';
import { RoleService } from '../../../../service/system/role/role.service';
import { PermissionService } from '../../../../service/system/permission/permission.service';
import { AssignRoleMenuDto } from '../../../../dto/system/assignRoleMenuDto';
import { HasPermission } from '../../../../common/decorators/hasPermission.decorator';
import { UserService } from '../../../../service/system/user/user.service';
import { AssignUserRoleDto } from '../../../../dto/system/assignUserRoleDto';
import { ObjectId } from 'typeorm';

@ApiTags('后台菜单接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/permission`)
export class PermissionController {
  constructor(
    private readonly roleService: RoleService,
    private readonly service: PermissionService,
    private readonly adminService: UserService,
  ) {}

  @ApiOperation({
    summary: '角色菜单ID列表',
    description: '角色菜单ID列表',
  })
  @Get('/list-role-resources')
  async listRoleResources(@Query('roleId') roleId: string) {
    return await this.service.listRoleResources(roleId);
  }

  @ApiOperation({
    summary: '角色菜单ID列表',
    description: '角色菜单ID列表',
  })
  @HasPermission('system:permission:assign-role-menu')
  @Post('/assign-role-menu')
  async assignRoleMenu(@Body() dto: AssignRoleMenuDto, @Req() req) {
    return await this.service.assignRoleMenu(dto, req);
  }

  @ApiOperation({
    summary: '设置用户角色ID列表',
    description: '设置用户角色ID列表',
  })
  @HasPermission('system:permission:assign-user-role')
  @Post('/assign-user-role')
  async assignUserRole(@Body() dto: AssignUserRoleDto, @Req() req) {
    return await this.service.assignUserRole(dto, req);
  }

  @ApiOperation({
    summary: '根据ID查询用户角色',
    description: '根据ID查询用户角色',
  })
  @Get('/list-user-roles')
  async listUserRoles(@Query('userId') userId) {
    return await this.adminService.listUserRoles(userId);
  }
}
