import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/system/admin/admin.service';
import { AzLogger } from '../../../service/logger/logger.service';
import { AuthService } from '../../../service/system/auth/auth.service';
import { RoleService } from '../../../service/system/role/role.service';
import { Config } from '../../../common/config/config';
import { RedisService } from '../../../service/redis/redis.service';
import { WechatLoginDto } from '../../../dto/wechat-login.dto';
import { UserService } from '../../../service/user/user.service';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';

@ApiTags('微信用户')
@Controller(`${Config.ADMIN_API_PREFIX}/wx/user`)
export class AppLoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private userService: UserService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: '获取当前登录用户' })
  async getProfile(@Request() req) {
    const user = await this.userService.findUserByOpenId(req.user.userName);
    const { openId, nickName, avatar } = user;
    return {
      userName: openId,
      nickName: nickName,
      avatar: avatar,
    };
  }

  @Get('logout')
  @ApiOperation({ summary: '退出登录' })
  async loginOut(@Request() req) {
    const key = `${req.user.userId}-${req.user.userName}`;
    await this.redis.remove(`${Config.USER_AUTH_JWT_PREFIX}:${key}`);
    req.user = null;
    return '您已成功退出';
  }

  @SkipAuth()
  @ApiOperation({ summary: '微信登录' })
  @ApiBody({ type: WechatLoginDto, required: true })
  @Post('login')
  async loginWithWechat(@Body() code: WechatLoginDto) {
    return await this.authService.loginWithWechat(code);
  }
}
