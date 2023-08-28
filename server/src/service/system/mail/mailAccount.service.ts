import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from '../../../common/constants/error.constants';
import { AzLogger } from '../../logger/logger.service';
import { ToolsService } from '../../tools/tools.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { NotifyMessage } from '../../../entity/system/notifyMessageEntity';
import { mailAccount } from '../../../entity/system/mailAcountEntity';
import * as _ from 'lodash';

@Injectable()
export class MailAccountService {
  constructor(
    @InjectRepository(mailAccount)
    public readonly repository: Repository<mailAccount>,
  ) {}

  async getPage({ pageNo, pageSize, orderBy, userName, mail }) {
    const skip = (pageNo - 1) * pageSize;
    const where = {};
    if (mail) {
      where['mail'] = Like(`%${mail}%`);
    }
    if (userName) {
      where['userName'] = Like(`%${userName}%`);
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

  async listAllSimple() {
    const accountList = await this.repository.find();
    return _.map(accountList, (account) => {
      return {
        id: account.id,
        mail: account.mail,
      };
    });
  }
}
