import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import {
  IdDto,
  IdsDto,
  IdStatusDto,
  ListDto,
  PageDto,
} from '../../../../dto/commonDto';
import { plainToClass } from 'class-transformer';
import { Not } from 'typeorm';
import { DeptDto } from '../../../../dto/system/deptDto';
import { Dept } from '../../../../entity/system/deptEntity';
import { Keep } from '../../../../common/decorators/keep.decorator';

@ApiTags('后台部门接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/dept`)
export class DeptController {
  constructor(private readonly service: DeptService) {}

  @ApiOperation({
    summary: '分页查询部门列表',
    description: '分页查询部门列表',
  })
  @Get('/list')
  async getPage(@Query() dto: PageDto) {
    const result = await this.service.getPage(
      dto.pageNo,
      dto.pageSize,
      dto.keywords,
      dto.orderBy,
    );
    return result[0];
  }

  @ApiOperation({
    summary: '查询部门列表',
    description: '查询部门列表',
  })
  @Get('/list-all-simple')
  async getList() {
    return await this.service.getList();
  }

  @ApiOperation({
    summary: '根据ID查询部门',
    description: '根据ID查询部门',
  })
  @Get('/getById')
  async getById(@Query() dto: IdDto) {
    return await this.service.getById(dto.id);
  }

  @ApiOperation({
    summary: '根据ID数组查询部门',
    description: '根据ID数组查询部门',
  })
  @Get('/getByIds')
  async getByIds(@Query() dto: IdsDto) {
    return await this.service.getByIds(dto.ids);
  }

  @ApiOperation({
    summary: '新增部门',
    description: '新增部门',
  })
  @Post('/add')
  @Keep()
  async add(@Body() dto: DeptDto) {
    const model = plainToClass(Dept, dto);
    const isRepeat = await this.service.repository.count({
      where: { name: model.name.trim() },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '部门名称重复',
        data: null,
      };
    } else {
      const result = await this.service.save(model);
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
    summary: '修改部门',
    description: '修改部门',
  })
  @Keep()
  @Post('/edit')
  async edit(@Body() dto: DeptDto) {
    const model = plainToClass(Dept, dto);
    const isRepeat = await this.service.repository.count({
      where: { id: Not(model.id), name: model.name.trim() },
    });
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '部门名称重复',
        data: null,
      };
    } else {
      const result = await this.service.save(model);
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
    summary: '删除部门',
    description: '删除部门',
  })
  @Delete('/del')
  @Keep()
  async del(@Req() req) {
    const result = await this.service.destroy(req.query.id);
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
    summary: '修改部门状态',
    description: '修改部门状态',
  })
  @Post('/setStatus')
  @Keep()
  async setStatus(@Body() dto: IdStatusDto) {
    const result = await this.service.repository
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
