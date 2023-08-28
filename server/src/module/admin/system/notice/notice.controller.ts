import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { Pagination } from '../../../../common/result-beans/Pagination';
import { NoticeDto } from '../../../../dto/noticeDto';
import { NoticeService } from '../../../../service/system/notice/notice.service';
import { ChangeStatusDto } from '../../../../dto/status.dto';
import { PageDto } from '../../../../dto/commonDto';
@ApiTags('公告')
@Controller(`${Config.ADMIN_API_PREFIX}/system/notice`)
export class NoticeController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private service: NoticeService,
  ) {}

  @ApiOperation({
    summary: '分页查通知列表',
    description: '分页查通知列表',
  })
  @Get('/page')
  async getPage(@Query() dto: PageDto) {
    const result = await this.service.getPage(
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

  @Post()
  async add(@Body() body: NoticeDto, @Request() request) {
    const cond = { ...body } as any;
    return await this.service.add(cond);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: ChangeStatusDto,
    @Request() request,
  ) {
    const cond = {
      userId: request.user.userid,
      id: id,
      status: body.status,
    };
    return this.service.updateStatus(cond);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: NoticeDto,
    @Request() request,
  ) {
    const cond = { ...body } as any;
    cond.userId = request.user.userId;
    cond.id = id;
    return this.service.update(cond);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id, @Request() req) {
    await this.service.delete({ id, userId: req.user.userId }).catch((err) => {
      throw err;
    });
    return '删除成功';
  }
}
