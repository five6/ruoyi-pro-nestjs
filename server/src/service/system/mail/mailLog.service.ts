import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { MailLog } from '../../../entity/system/mailLogEntity';

@Injectable()
export class MailLogService {
  constructor(
    @InjectRepository(MailLog)
    public readonly repository: Repository<MailLog>,
  ) {}

  async getPage({
    pageNo,
    pageSize,
    sendTime,
    userId,
    userType,
    sendStatus,
    accountId,
    templateId,
    orderBy,
  }) {
    const skip = (pageNo - 1) * pageSize;
    const where = {};
    if (sendTime?.length === 2 && sendTime[0] && sendTime[1]) {
      where['sendTime'] = Between(sendTime[0], sendTime[1]);
    }
    if (userId) {
      where['userId'] = userId;
    }
    if (userType) {
      where['userType'] = userType;
    }
    if (sendStatus) {
      where['sendStatus'] = sendStatus;
    }
    if (accountId) {
      where['accountId'] = accountId;
    }
    if (templateId) {
      where['templateId'] = templateId;
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
