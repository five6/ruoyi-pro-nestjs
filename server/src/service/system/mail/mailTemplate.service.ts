import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { MailTemplate } from 'src/entity/system/mailTemplateEntity';

@Injectable()
export class MailTemplateService {
  constructor(
    @InjectRepository(MailTemplate)
    public readonly repository: Repository<MailTemplate>,
  ) {}

  async getPage({
    pageNo,
    pageSize,
    orderBy,
    code,
    name,
    accountId,
    status,
    createTime,
  }) {
    const skip = (pageNo - 1) * pageSize;
    const where = {};
    if (name) {
      where['name'] = Like(`%${name}%`);
    }
    if (code) {
      where['code'] = code;
    }
    if (accountId) {
      where['accountId'] = accountId;
    }
    if (status) {
      where['status'] = status;
    }
    if (createTime?.length === 2 && createTime[0] && createTime[1]) {
      where['createTime'] = Between(createTime[0], createTime[1]);
    }
    return await this.repository.findAndCount({
      where,
      order: {
        [orderBy || 'id']: 'ASC',
      },
      skip,
      take: pageSize,
    });
  }
}
