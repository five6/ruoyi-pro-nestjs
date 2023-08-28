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

import { Config } from '../../../../common/config/config';
import { IdStatusDto, PageDto } from '../../../../dto/commonDto';
import { MailAccountService } from '../../../../service/system/mail/mailAccount.service';
import { MailAccountPageDto } from '../../../../dto/system/mailDto';

@ApiTags('邮件账号')
@Controller(`${Config.ADMIN_API_PREFIX}/system/mail-account`)
export class MailAccountController {
  constructor(private service: MailAccountService) {}

  @Get('/page')
  async getPage(@Query() dto: MailAccountPageDto) {
    const result = await this.service.getPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }

  @Get('/list-all-simple')
  async listAllSimple() {
    return await this.service.listAllSimple();
  }

  @ApiOperation({
    summary: '修改账号状态',
    description: '修改账号状态',
  })
  @Post('/setStatus')
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
        message: 'success',
        code: 0,
        success: true,
        data: result,
      };
    } else {
      return {
        message: '设置失败',
        code: -1,
        success: false,
        data: null,
      };
    }
  }
}
