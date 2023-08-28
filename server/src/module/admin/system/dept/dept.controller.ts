import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Req,
  Put,
  HttpException,
  HttpStatus,
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
import { DeptDto, DeptPageDto } from '../../../../dto/system/deptDto';
import { Dept } from '../../../../entity/system/deptEntity';
import { Keep } from '../../../../common/decorators/keep.decorator';
import * as _ from 'lodash';
import { ObjectId } from 'mongodb';
import { errors } from '../../../../common/constants/error.constants';
@ApiTags('后台部门接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/dept`)
export class DeptController {
  constructor(private readonly service: DeptService) {}

  @ApiOperation({
    summary: '分页查询部门列表',
    description: '分页查询部门列表',
  })
  @Get('/list')
  async getPage(@Query() dto: DeptPageDto) {
    const result = await this.service.getPage(dto);
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
    summary: '新增部门',
    description: '新增部门',
  })
  @Post('/add')
  async add(@Body() dto: DeptDto) {
    const model = plainToClass(Dept, dto);
    const isRepeat = await this.service.repository.countBy({
      name: model.name.trim(),
    });
    if (isRepeat > 0) {
      throw new HttpException(
        errors.DEPT_NAME_REPEAT_ERROR,
        HttpStatus.FORBIDDEN,
      );
    } else {
      return await this.service.save(model);
    }
  }

  @ApiOperation({
    summary: '修改部门',
    description: '修改部门',
  })
  @Put('/update')
  async update(@Body() dto: DeptDto) {
    const model = plainToClass(Dept, dto);
    const isRepeat = await this.service.repository.countBy({
      _id: { $ne: new ObjectId(dto.id) },
      deleted: null,
      name: model.name.trim(),
    });
    if (isRepeat > 0) {
      throw new HttpException(
        errors.DEPT_NAME_REPEAT_ERROR,
        HttpStatus.FORBIDDEN,
      );
    } else {
      return await this.service.save(model);
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
    return {
      code: 0,
      success: true,
      message: 'success',
      data: result,
    };
  }
}
