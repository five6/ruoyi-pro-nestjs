import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { RedisService } from '../../../../service/redis/redis.service';
import { TenantPackageService } from '../../../../service/system/tenant/tenantPackage.service';
import { Keep } from '../../../../common/decorators/keep.decorator';
import { TenantPackage } from '../../../../entity/system/tenantPackageEntity';
import { plainToClass } from 'class-transformer';
import { Not } from 'typeorm';
import { TenantPackageDto } from '../../../../dto/tenantPackageDto';

@ApiTags('后台租户套餐接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/tenant-package`)
export class TenantPackageController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: AdminService,
    private readonly service: TenantPackageService,
  ) {}

  @Get('/page')
  async page() {
    const result = await this.service.getPage();
    return {
      total: result[1],
      list: result[0],
    };
  }

  @ApiOperation({
    summary: '根据租户ID获取租户信息',
    description: '根据租户ID获取租户信息',
  })
  @Get('/get')
  async findOne(@Query() query) {
    return await this.service.findOne(query.id);
  }

  @ApiOperation({
    summary: '新增租户',
    description: '新增租户',
  })
  @Post('/create')
  @Keep()
  async add(@Body() dto: TenantPackageDto, @Req() req) {
    const model = plainToClass(TenantPackage, dto);
    const isRepeat = await this.service.repository.count({
      where: { name: model.name.trim() },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '租户套餐名称重复',
        data: null,
      };
    } else {
      const result = await this.service.save(model, req.user);
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
    summary: '更新取租户信息',
    description: '更新租户信息',
  })
  @Put('/update')
  async update(@Body() tenantDto: TenantPackageDto, @Req() req) {
    const model = plainToClass(TenantPackage, tenantDto);
    const isRepeat = await this.service.repository.count({
      where: {
        id: Not(model.id),
        name: model.name.trim(),
      },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '租户名称重复',
        data: null,
      };
    } else {
      const result = await this.service.save(model, req.user);
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
}
