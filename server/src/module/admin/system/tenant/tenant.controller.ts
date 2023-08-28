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
import { IdDto, PageDto } from '../../../../dto/commonDto';
import { TenantService } from '../../../../service/system/tenant/tenant.service';
import { TenantDto } from '../../../../dto/tenantDto';
import { Not } from 'typeorm';
import { Tenant } from '../../../../entity/system/tenantEntity';
import { plainToClass } from 'class-transformer';
import { Keep } from '../../../../common/decorators/keep.decorator';

@ApiTags('后台租户接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/tenant`)
export class TenantController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: AdminService,
    private readonly tenantService: TenantService,
  ) {}

  @Get('/page')
  async getPage(@Query() dto: PageDto) {
    const result = await this.tenantService.getPage(
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
    summary: '根据租户ID获取租户信息',
    description: '根据租户ID获取租户信息',
  })
  @Get('/get')
  async findOne(@Query() query) {
    return await this.tenantService.findOne(query.id);
  }

  @ApiOperation({
    summary: '新增租户',
    description: '新增租户',
  })
  @Post('/create')
  @Keep()
  async add(@Body() dto: TenantDto, @Req() req) {
    const model = plainToClass(Tenant, dto);
    const isRepeat = await this.tenantService.repository.count({
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
      const result = await this.tenantService.save(model, req.user);
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
  async update(@Body() tenantDto: TenantDto, @Req() req) {
    const model = plainToClass(Tenant, tenantDto);
    const isRepeat = await this.tenantService.repository.count({
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
      const result = await this.tenantService.save(model, req.user);
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
