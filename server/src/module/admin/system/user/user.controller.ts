import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Request,
  Response,
  Session,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';

import { UserService } from '../../../../service/system/user/user.service';

import { AzLogger } from '../../../../service/logger/logger.service';

import { AuthService } from '../../../../service/system/auth/auth.service';
import { AdminDto } from '../../../../dto/system/adminDto';
import { LoginDto } from '../../../../dto/system/loginDto';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { errors } from '../../../../common/constants/error.constants';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { Equal, In, Not } from 'typeorm';
import { UserDto } from '../../../../dto/system/UserDto';
import { Admin } from '../../../../entity/system/adminEntity';
import {
  IdDto,
  IdsDto,
  IdStatusDto,
  ListDto,
  PageDto,
} from '../../../../dto/commonDto';
import { Keep } from '../../../../common/decorators/keep.decorator';
import * as _ from 'lodash';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { UserPageDto } from '../../../../dto/system/userPageDto';
import { ObjectId } from 'mongodb';
import { redisUtils } from '../../../../common/utils/redisUtils';
import { JwtService } from '@nestjs/jwt';
import { HasPermission } from '../../../../common/decorators/hasPermission.decorator';

@ApiTags('后台用户')
@Controller(`${Config.ADMIN_API_PREFIX}/system/user`)
export class AdminController {
  constructor(
    private jwtService: JwtService,
    private toolsService: ToolsService,
    private adminService: UserService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private menuService: MenuService,
    private roleService: RoleService,
    private redis: RedisService,
    private configService: ConfigService,
    private deptService: DeptService,
  ) {}

  @SkipAuth()
  @Keep()
  @Get('captcha')
  @ApiOperation({ summary: '获取图片验证码' })
  async getCode(@Request() req, @Response() res) {
    const svgCaptcha = await this.toolsService.getCaptcha(
      req.query.size,
      req.query.with,
      req.query.height,
    );
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @SkipAuth()
  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto, @Session() session): Promise<any> {
    // 暂时不用验证码
    // if (body.captcha !== session.code) {
    //   return {
    //     data: null,
    //     code: -1,
    //     message: '验证码不正确！',
    //   };
    // }
    const user = await this.authService.validateUser(
      body.userName,
      body.password,
    );
    if (!user) {
      throw new NotFoundException(errors.USER_VALIDATE_ERROR);
    } else if (user.status == 0) {
      throw new ForbiddenException(errors.USER_LOCKED);
    }

    const roles = await this.roleService.getByIds(user.roleIds);
    let menuIds = [] as any;
    _.each(roles, (role) => {
      menuIds = menuIds.concat(role.menuIds || []);
    });
    const perms = await this.menuService.getBygetByIdsAndTypeId({
      ids: menuIds,
      type: 3,
    });

    user.permissions = _.map(perms, (p) => p.permission);
    const seconds = this.configService.get<number>('JWT_EXPIRE_TIME');
    const obj = await this.authService.signIn(user);
    let key = null;
    if (this.configService.get('SINGLE_CLIENT_ONLINE') === 'true') {
      key = redisUtils.getSingleAuthJwtPrefix(user.id);
    } else {
      const lenKey = redisUtils.getAuthJwtPrefixLenth(user.id);
      const keys = await this.redis.redis.keys(lenKey);
      key = redisUtils.getAuthJwtPrefix(
        user.id,
        keys.length ? keys.length + 1 : 1,
      );
    }

    await this.redis.set(key, obj.access_token, +seconds);

    return {
      userId: user.id,
      // refreshToken: md5,
      accessToken: `Bearer ${obj.access_token}`,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async loginOut(@Request() req) {
    if (this.configService.get('SINGLE_CLIENT_ONLINE') === 'true') {
      this.redis.remove(redisUtils.getSingleAuthJwtPrefix(req.user.userId));
      req.user = null;
      return '您已成功退出';
    }
    const authorization = req['headers'].authorization || void 0;
    const token = authorization.split(' ')[1];
    const lenKey = redisUtils.getAuthJwtPrefixLenth(req.user.userId);
    const keys = await this.redis.redis.keys(lenKey);

    await Promise.all(
      keys.map(async (key) => {
        const value = await this.redis.get(key);
        if (value == token) {
          await this.redis.remove(key);
        }
      }),
    );

    req.user = null;
    return '您已成功退出';
  }

  @Post('add')
  @ApiOperation({ summary: '添加用户' })
  @ApiBody({ type: AdminDto, required: true })
  @HasPermission('system:user:create')
  async signup(@Body() user: AdminDto) {
    const u = await this.adminService.add(user);
    return {
      userName: u.userName,
      email: u.email,
    };
  }

  @Get('/page')
  async getPage(@Query() dto: UserPageDto) {
    const deptList = await this.deptService.getList();
    const result = await this.adminService.getPage(dto);
    return {
      total: result[1],
      list: _.map(result[0], (item) => {
        item.dept = _.find(deptList, (dept) => {
          return (dept.id = item.deptId);
        });
        return _.omit(item, ['password', 'salt', 'deleted', 'validateToken']);
      }),
    };
  }

  @Get('/getUserInfo')
  @Keep()
  async getUserInfo(@Request() req) {
    try {
      const result = await this.adminService.getById(req.user.userId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...retUserInfo } = result;

      const resultBean = {
        code: 0,
        message: 'success',
        success: true,
        data: { user: retUserInfo, roles: [], permissions: [] },
      };
      const roleCodes = [];
      const roleIds = [];
      for (const roleId of retUserInfo.roleIds) {
        roleIds.push(new ObjectId(roleId));
      }
      if (!roleIds.length) {
        return resultBean;
      }
      const roles = await this.roleService.repository.find({
        _id: {
          $in: roleIds,
        },
      });
      const menuIds = [];
      for (const role of roles) {
        roleCodes.push(role.code);
        if (role.menuIds?.length) {
          role.menuIds.forEach((menuId) => {
            menuIds.push(new ObjectId(menuId));
          });
        }
      }
      if (!menuIds.length) {
        return resultBean;
      }
      const menus = await this.menuService.repository.find({
        _id: {
          $in: menuIds,
        },
      });
      const permissions: string[] = [];
      for (const menu of menus) {
        permissions.push(menu.permission);
      }
      return {
        code: 0,
        message: 'success',
        success: true,
        data: { user: retUserInfo, roles: roleCodes, permissions: permissions },
      };
    } catch (ex) {
      return {
        code: -1,
        data: null,
        message: '获取用户信息失败',
        success: false,
      };
    }
  }

  @ApiOperation({
    summary: '查询用户列表',
    description: '查询用户列表',
  })
  @Get('/list-all-simple')
  async getList() {
    return await this.adminService.listAllSimple();
  }

  @ApiOperation({
    summary: '根据ID查询用户',
    description: '根据ID查询用户',
  })
  @Get('/getById')
  async getById(@Query() dto: IdDto) {
    return await this.adminService.getById(new ObjectId(dto.id));
  }

  @ApiOperation({
    summary: '假删除用户',
    description: '假删除用户',
  })
  @Delete('/del')
  async del(@Query('id') id, @Request() request) {
    if (id == request.user.userId) {
      return {
        code: -1,
        success: false,
        message: '不能删除当前登录的用户状态',
        data: null,
      };
    }
    return await this.adminService.destroy(id);
  }

  @Put('update-password')
  @ApiOperation({ summary: '更新用户密码' })
  async updatePassword(@Body() body, @Request() request) {
    const cond = {} as any;
    cond.userName = request.user.userName;
    cond.password = body.password;
    await this.adminService.updatePassword(body.id, cond);
    return '修改成功';
  }

  @ApiOperation({
    summary: '修改用户状态',
    description: '修改用户状态',
  })
  @Put('/update-status')
  async setStatus(@Body() dto: IdStatusDto, @Request() request) {
    if (dto.id == request.user.userId) {
      return {
        code: -1,
        success: false,
        message: '不能修改当前登录的用户状态',
        data: null,
      };
    }
    await this.adminService.adminRepository.updateOne(
      { _id: new ObjectId(dto.id) },
      { $set: { status: dto.status } },
    );

    return {
      code: 0,
      success: true,
      message: '修改成功',
      data: 1,
    };
  }

  @Put('/update')
  @Keep()
  async update(@Body() dto: UserDto) {
    const dbItem = await this.adminService.adminRepository.findOneBy({
      where: {
        _id: { $ne: new ObjectId(dto.id) },
        userName: Equal(dto.userName.trim()),
        mobile: Equal(dto.mobile.trim()),
        email: Equal(dto.email.trim()),
      },
    });
    if (dbItem) {
      return {
        code: -1,
        success: false,
        message: '账号、手机号、邮箱重复！',
        data: null,
      };
    } else {
      const result = await this.adminService.adminRepository.updateOne(
        {
          _id: new ObjectId(dto.id),
        },
        {
          $set: {
            deptId: dto.deptId,
            email: dto.email,
            idCard: dto.idCard,
            mobile: dto.mobile,
            nickName: dto.nickName,
            remark: dto.remark,
            sex: dto.sex,
          },
        },
      );
      if (result) {
        return {
          code: 0,
          success: true,
          message: 'success',
          data: null,
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
}
