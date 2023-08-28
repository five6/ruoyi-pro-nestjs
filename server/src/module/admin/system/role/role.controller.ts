import { Controller, Post, Body, Query, Get, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../../../../service/system/role/role.service';
import { ToolsService } from '../../../../service/tools/tools.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { Config } from '../../../../common/config/config';
import {
  IdDto,
  IdsDto,
  IdStatusDto,
  ListDto,
  PageDto,
} from 'src/dto/commonDto';
import { Not } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Role } from '../../../../entity/system/roleEntity';
import { RoleDto } from '../../../../dto/roleDto';
import { Keep } from '../../../../common/decorators/keep.decorator';
@ApiTags('角色信息')
@Controller(`${Config.ADMIN_API_PREFIX}/system/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
    private loggerService: AzLogger,
  ) {}
  //#region  基础控制器
  @ApiOperation({
    summary: '分页查询角色列表',
    description: '分页查询角色列表',
  })
  @Get('/page')
  async getPage(@Query() dto: PageDto) {
    const result = await this.roleService.getPage(
      dto.pageNo,
      dto.pageSize,
      dto.keywords,
      dto.orderBy,
    );
    return {
      total: result[1],
      list: result[0],
    };
  }

  @ApiOperation({
    summary: '查询角色列表',
    description: '查询角色列表',
  })
  @Get('/list-all-simple')
  async getList() {
    return await this.roleService.getList();
  }

  @ApiOperation({
    summary: '根据ID查询角色',
    description: '根据ID查询角色',
  })
  @Get('/getById')
  async getById(@Query() dto: IdDto) {
    return await this.roleService.getById(dto.id);
  }

  @ApiOperation({
    summary: '根据ID数组查询角色',
    description: '根据ID数组查询角色',
  })
  @Get('/getByIds')
  async getByIds(@Query() dto: IdsDto) {
    return await this.roleService.getByIds(dto.ids);
  }

  @ApiOperation({
    summary: '新增角色',
    description: '新增角色',
  })
  @Post('/create')
  @Keep()
  async add(@Body() dto: RoleDto) {
    const model = plainToClass(Role, dto);
    const isRepeat = await this.roleService.repository.count({
      where: { name: model.name.trim() },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '角色名称重复',
        data: null,
      };
    } else {
      const result = await this.roleService.save(model);
      if (result) {
        return {
          code: 0,
          success: true,
          message: 'success',
          data: result,
        };
      } else {
        return {
          code: -1,
          success: false,
          message: 'fail',
          data: null,
        };
      }
    }
  }

  @ApiOperation({
    summary: '修改角色',
    description: '修改角色',
  })
  @Put('/update')
  @Keep()
  async edit(@Body() dto: RoleDto) {
    const model = plainToClass(Role, dto);
    const isRepeat = await this.roleService.repository.count({
      where: {
        id: Not(model.id),
        name: model.name.trim(),
        code: model.code.trim(),
      },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '角色名称重复',
        data: null,
      };
    } else {
      const result = await this.roleService.save(model);
      if (result) {
        return {
          code: 0,
          success: true,
          message: 'success',
          data: result,
        };
      } else {
        return {
          code: -1,
          success: false,
          message: 'fail',
          data: null,
        };
      }
    }
  }

  @ApiOperation({
    summary: '删除角色',
    description: '删除角色',
  })
  @Keep()
  @Post('/del')
  async del(@Body() dto: IdDto) {
    const result = await this.roleService.destroy(dto.id);
    if (result) {
      return {
        code: 0,
        success: true,
        message: 'success',
        data: result,
      };
    } else {
      return {
        code: -1,
        success: false,
        message: 'fail',
        data: null,
      };
    }
  }

  @ApiOperation({
    summary: '修改角色状态',
    description: '修改角色状态',
  })
  @Keep()
  @Post('/update-status')
  async setStatus(@Body() dto: IdStatusDto) {
    const result = await this.roleService.repository
      .createQueryBuilder()
      .update()
      .set({
        status: dto.status,
      })
      .where('id = :id', { id: dto.id })
      .execute();
    if (result.affected > 0) {
      return {
        code: 0,
        success: true,
        message: 'success',
        data: result,
      };
    } else {
      return {
        code: -1,
        success: false,
        message: 'fail',
        data: null,
      };
    }
  }
}
