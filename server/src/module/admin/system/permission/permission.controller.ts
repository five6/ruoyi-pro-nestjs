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
import {
  IdDto,
  IdsDto,
  IdStatusDto,
  ListDto,
  PageDto,
  RoleIdDto,
} from 'src/dto/commonDto';
import { Config } from '../../../../common/config/config';
import { RoleService } from '../../../../service/system/role/role.service';
import { PermissionService } from '../../../../service/system/permission/permission.service';
import { AssignRoleMenuDto } from '../../../../dto/system/assignRoleMenuDto';
import { hasPermission } from '../../../../common/decorators/hasPermission.decorator';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { AssignUserRoleDto } from 'src/dto/system/assignUserRoleDto';

@ApiTags('后台菜单接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/permission`)
export class PermissionController {
  constructor(
    private readonly roleService: RoleService,
    private readonly service: PermissionService,
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({
    summary: '角色菜单ID列表',
    description: '角色菜单ID列表',
  })
  @Get('/list-role-resources')
  async listRoleResources(@Req() req) {
    return await this.service.listRoleResources(req.query.roleId);
  }

  @ApiOperation({
    summary: '角色菜单ID列表',
    description: '角色菜单ID列表',
  })
  @hasPermission('system:permission:assign-role-menu')
  @Post('/assign-role-menu')
  async assignRoleMenu(@Body() dto: AssignRoleMenuDto, @Req() req) {
    return await this.service.assignRoleMenu(dto, req);
  }

  @ApiOperation({
    summary: '设置用户角色ID列表',
    description: '设置用户角色ID列表',
  })
  @hasPermission('system:permission:assign-role-menu')
  @Post('/assign-user-role')
  async assignUserRole(@Body() dto: AssignUserRoleDto, @Req() req) {
    return await this.service.assignUserRole(dto, req);
  }

  @ApiOperation({
    summary: '根据ID查询用户角色',
    description: '根据ID查询用户角色',
  })
  @Get('/list-user-roles')
  async listUserRoles(@Query('userId') userId: number) {
    return await this.adminService.listUserRoles(userId);
  }
}
