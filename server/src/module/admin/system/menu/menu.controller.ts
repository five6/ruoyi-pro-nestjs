import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IdDto, IdsDto } from '../../../../dto/commonDto';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { Menu } from '../../../../entity/system/menuEntity';
import { Equal, In, Not } from 'typeorm';
import { MenuDto } from '../../../../dto/system/menuDto';
import { plainToClass } from 'class-transformer';
import { RoleService } from '../../../../service/system/role/role.service';
import { ToolsService } from '../../../../service/tools/tools.service';
import * as _ from 'lodash';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { ObjectId } from 'mongodb';
@ApiTags('后台菜单接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/menu`)
export class MenuController {
  constructor(
    private readonly roleService: RoleService,
    private readonly service: MenuService,
    private readonly toolService: ToolsService,
    private readonly authService: AuthService,
  ) {}

  //#region  基础控制器
  @ApiOperation({
    summary: '分页查询菜单列表',
    description: '分页查询菜单列表',
  })
  @ApiProperty()
  @Get('/list')
  async getPage() {
    return await this.service.getList();
  }

  @ApiOperation({
    summary: '查询路由列表',
    description: '查询路由列表',
  })
  @Get('/list-menus')
  async listMenu(@Req() req) {
    // 获得角色列表
    const user = await this.authService.getLoginUser(req.user.userId);
    if (!user.roleIds?.length) {
      return [];
    }
    const roles = await this.roleService.repository.find({
      _id: {
        $in: user.roleIds.map((roleId) => {
          return new ObjectId(roleId);
        }),
      },
      deleted: null,
    });
    if (!roles?.length) {
      return [];
    }
    const menuIds = [];
    roles.forEach((role) => {
      if (role.menuIds?.length) {
        for (const menuId of role.menuIds) {
          menuIds.push(new ObjectId(menuId));
        }
      }
    });
    if (!menuIds.length) {
      return [];
    }
    const menus = await this.service.repository.find({
      _id: { $in: menuIds },
      type: { $in: [0, 1, 2] },
    });
    // 获得用户拥有的菜单列表
    return this.toolService.convertMenuToResult(menus);
  }

  @ApiOperation({
    summary: '查询菜单列表',
    description: '查询菜单列表',
  })
  @Get('/list-all-simple')
  async getList() {
    return await this.service.getSimpleList();
  }

  @ApiOperation({
    summary: '根据ID查询菜单',
    description: '根据ID查询菜单',
  })
  @Get('/get')
  async getById(@Query() dto: IdDto) {
    return await this.service.getById(dto.id);
  }

  @ApiOperation({
    summary: '新增菜单',
    description: '新增菜单',
  })
  @Post('/create')
  async add(@Body() dto: MenuDto) {
    const model = plainToClass(Menu, dto);
    const isRepeat = await this.service.repository.find({
      name: Equal(model.name.trim()),
      permission: Equal(model.permission.trim()),
    });
    if (isRepeat.length > 0) {
      return {
        message: '路由名称或者权限标识重复',
        code: -1,
      };
    } else {
      const result = await this.service.save(model);
      return {
        data: result,
        code: 0,
        message: 'success',
        success: true,
      };
    }
  }

  @ApiOperation({
    summary: '修改菜单',
    description: '修改菜单',
  })
  @Put('/update')
  async edit(@Body() dto: MenuDto) {
    const model = plainToClass(Menu, dto);
    const isRepeat = await this.service.repository.find({
      _id: Not(model.id),
      name: Equal(model.name.trim()),
      permission: Equal(model.permission.trim()),
    });
    if (isRepeat.length > 0) {
      return {
        message: '路由名称或者权限标识重复',
        code: -1,
        success: false,
        data: null,
      };
    } else {
      const result = await this.service.save(model);
      return {
        message: 'success',
        code: 0,
        success: true,
        data: result,
      };
    }
  }
  @ApiOperation({
    summary: '假删除菜单',
    description: '假删除菜单',
  })
  @Delete('/delete')
  async delete(@Query('id') id) {
    return await this.service.destroy(id);
  }
}
