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
import { IdDto, IdsDto, PageDto } from 'src/dto/commonDto';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { Menu } from 'src/entity/system/menuEntity';
import { Equal, In, Not } from 'typeorm';
import { MenuDto } from '../../../../dto/menuDto';
import { plainToClass } from 'class-transformer';
import { RoleService } from '../../../../service/system/role/role.service';
import { ToolsService } from '../../../../service/tools/tools.service';

@ApiTags('后台菜单接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/menu`)
export class MenuController {
  constructor(
    private readonly roleService: RoleService,
    private readonly service: MenuService,
    private readonly toolService: ToolsService,
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
    const userRoles = await this.roleService.userRoleRepository.find({
      where: {
        userId: req.user.userId,
      },
    });
    const roleIds: number[] = [];
    for (const userRole of userRoles) {
      roleIds.push(userRole.roleId);
    }
    if (!roleIds.length) {
      return [];
    }
    const roleMenus = await this.roleService.roleMenuRepository.find({
      where: {
        roleId: In(roleIds),
      },
    });
    const menuIds: number[] = [];
    for (const userRole of roleMenus) {
      menuIds.push(userRole.menuId);
    }
    if (!menuIds.length) {
      return [];
    }
    const menus = await this.service.repository.find({
      where: {
        id: In(menuIds),
        type: In([0, 1, 2]),
      },
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
    summary: '根据ID数组查询菜单',
    description: '根据ID数组查询菜单',
  })
  @Get('/getByIds')
  async getByIds(@Query() dto: IdsDto) {
    return await this.service.getByIds(dto.ids);
  }

  @ApiOperation({
    summary: '新增菜单',
    description: '新增菜单',
  })
  @Post('/create')
  async add(@Body() dto: MenuDto) {
    const model = plainToClass(Menu, dto);
    const isRepeat = await this.service.repository
      .createQueryBuilder()
      .orWhere({ name: Equal(model.name.trim()) })
      .orWhere({ permission: Equal(model.permission.trim()) })
      .getCount();
    if (isRepeat > 0) {
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
    const isRepeat = await this.service.repository
      .createQueryBuilder()
      .where({ id: Not(model.id) })
      .andWhere([
        { name: Equal(model.name.trim()) },
        { permission: Equal(model.permission.trim()) },
      ])
      .getCount();
    if (isRepeat > 0) {
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
  async delete(@Query() id: number) {
    return await this.service.destroy(id);
  }
}
