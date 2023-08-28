import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { UserInterface } from '../../interface/user.interface';
import { AzLogger } from '../logger/logger.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { errors } from '../../common/constants/error.constants';
import { WechatUtils } from '../../common/utils/wechatUtils';
import { Pagination } from '../../common/result-beans/Pagination';
import * as _ from 'lodash';
import { ToolsService } from '../tools/tools.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Player } from '../../entity/game/playerEntity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Player)
    public readonly userModel: Repository<Player>,

    private readonly logger: AzLogger,
    private toolsService: ToolsService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async find(
    json: UserInterface = {},
    fields?: string,
    pagination?: Pagination,
  ) {
    const cond = {} as any;
    try {
      if (!_.isEmpty(json.status)) {
        cond.status = json.status;
      }
      if (json.type) {
        cond.type = json.type;
      }
      if (json.nickName) {
        cond.nickName = Like(`${json.nickName}%`);
      }
      const [result, totalCount] = await this.userModel.findAndCount({
        where: cond,
        // select: fields,
        skip: pagination.skip,
        take: pagination.pageSize,
      });
      return [result, totalCount];
    } catch (error) {
      this.logger.error('获取用户失败', error);
      return null;
    }
  }
  async findUserByOpenId(openId: string, fields?: string) {
    try {
      return await this.userModel.findOne({
        where: {
          openId: openId,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async add(json: UserInterface) {
    try {
      const player = plainToInstance(Player, json);
      player.type = 1; // 微信用户
      player.email = json.openid;
      player.mobile = json.openid;
      return this.userModel.save(player);
    } catch (error) {
      return null;
    }
  }

  async changeLockStatus(cond) {
    try {
      const { id, ...data } = cond;
      const user = plainToInstance(Player, data);
      return await this.userModel.update({ id: id }, user);
    } catch (error) {
      return null;
    }
  }

  async findOne(id) {
    try {
      return await this.userModel.findOne(id);
    } catch (error) {
      return null;
    }
  }

  async getWxUserOpenId(
    code: string,
    encryptedData?: string,
    iv?: string,
  ): Promise<any> {
    const appId = this.configService.get('WECHAT_APPID');
    const appSecret = this.configService.get('WECHAT_APPSECRET');
    let { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.weixin.qq.com/sns/jscode2session?js_code=${code}&grant_type=authorization_code&appid=${appId}&secret=${appSecret}`,
          { timeout: 5000 },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw error.message || errors.WECHAT_INVALID_CODE_ERROR;
          }),
        ),
    );
    if (!data.openid) {
      this.logger.error(data);
      throw new InternalServerErrorException(errors.WECHAT_INVALID_CODE_ERROR);
    }
    try {
      const wechatUtils = new WechatUtils(
        this.configService.get('WECHAT_APPID'),
        data.session_key,
      );
      const decryptData = wechatUtils.decryptData(encryptedData, iv);
      data = Object.assign(data, decryptData);
    } catch {
      this.logger.log('无法获取用户详细信息');
    }
    return data;
  }

  async getWxUserInfo(session_key: string, openid: string) {
    const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${session_key}&&openid=${openid}&lang=zh_CN`;
    const { data } = await firstValueFrom(
      this.httpService.post(url, { timeout: 5000 }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw error.message || errors.WECHAT_INVALID_CODE_ERROR;
        }),
      ),
    );
    return data;
  }

  async addPlayer(userDto: any) {
    const model = plainToInstance(Player, userDto);
    model.openId = await this.toolsService.getRandomUrlString();
    model.userName = model.openId;
    model.email = model.openId;
    model.mobile = model.openId;
    model.type = 2; // 1. 微信用户，2.机器人
    try {
      return await this.userModel.save(model);
    } catch (error) {
      this.logger.error(error, '添加失败');
      if (error.code === 11000) {
        throw new NotAcceptableException('用户名重复');
      }
    }
  }

  async update(id: number, json: any) {
    try {
      const { id, ...body } = json;
      delete body.deleted;
      delete body.status;
      const notice = plainToInstance(Player, body);
      return await this.userModel.update(id, notice);
    } catch (error) {
      throw new InternalServerErrorException(errors.UNKNOWN_ERROR);
    }
  }
}
