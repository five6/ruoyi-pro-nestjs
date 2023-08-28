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
import { EmailService } from '../../../../service/system/email/email.service';
import { EmailDto } from '../../../../dto/emailDto';
import { IdDto, IdStatusDto, PageDto } from '../../../../dto/commonDto';
import { MailTemplateService } from 'src/service/system/mail/mailTemplate.service';
import { MailTemplatePageDto } from 'src/dto/system/mailDto';
import * as _ from 'lodash';
import { AzLogger } from 'src/service/logger/logger.service';
import { logger } from 'src/middleware/logger.middleware';

@ApiTags('邮件模板')
@Controller(`${Config.ADMIN_API_PREFIX}/system/mail-template`)
export class MailTemplateController {
  constructor(private service: MailTemplateService, logger: AzLogger) {}
  @Get('/page')
  async getPage(@Query() dto: MailTemplatePageDto) {
    const result = await this.service.getPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }

  @Get('/get')
  async get(@Query('id') id) {
    const item = await this.service.repository.findOneBy({ id: id });
    if (!item) return null;
    try {
      (item as any).params = JSON.parse(item.params);
    } catch (e) {
      logger.info('参数为空。。');
    }
    return item;
  }

  @ApiOperation({
    summary: '修改模板状态',
    description: '修改模板状态',
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
