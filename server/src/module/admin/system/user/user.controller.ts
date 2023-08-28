import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
  Session,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';

import { AdminService } from '../../../../service/system/admin/admin.service';

import { AzLogger } from '../../../../service/logger/logger.service';

import { AuthService } from '../../../../service/system/auth/auth.service';
import { AdminDto } from '../../../../dto/system/adminDto';
import { LoginDto } from '../../../../dto/loginDto';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { errors } from '../../../../common/constants/error.constants';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { Equal, In, Not } from 'typeorm';
import { UserDto } from '../../../../dto/UserDto';
import { Admin } from '../../../../entity/system/adminEntity';
import {
  IdDto,
  IdsDto,
  IdStatusDto,
} from '../../../../dto/commonDto';
import { Keep } from '../../../../common/decorators/keep.decorator';
import * as _ from 'lodash';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { UserPageDto } from '../../../../dto/userPageDto';

@ApiTags('后台用户')
@Controller(`${Config.ADMIN_API_PREFIX}/system/user`)
export class AdminController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private menuService: MenuService,
    private roleService: RoleService,
    private redis: RedisService,
    private configService: ConfigService,
    private deptService: DeptService,
  ) {}

  @SkipAuth()
  @Get('validate/account/:id')
  async validateAccount(@Param('id') unValidateEmailToken: string) {
    await this.adminService.validateAccount(unValidateEmailToken);
    return '账户激活成功';
  }

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
    //   this.toolsService.getCaptcha();
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

    const obj = await this.authService.signIn(user);
    const key = `${user.id}_${user.userName}`;
    const seconds = this.configService.get<number>('JWT_EXPIRE_TIME'); // 1天
    const md5 = this.toolsService.getMd5(key);
    await this.redis.set(
      `${Config.USER_AUTH_JWT_PREFIX}:${key}`,
      obj.access_token,
      +seconds,
    );
    return {
      userId: user.id,
      refreshToken: md5, // refresh token
      accessToken: `Bearer ${obj.access_token}`,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async loginOut(@Request() req) {
    const key = `${req.user.userId}_${req.user.userName}`;
    await this.redis.remove(`${Config.USER_AUTH_JWT_PREFIX}:${key}`);
    req.user = null;
    return '您已成功退出';
  }

  @Post('add')
  @SkipAuth()
  @ApiOperation({ summary: '添加用户' })
  @ApiBody({ type: AdminDto, required: true })
  async signup(@Body() user: AdminDto) {
    // if (user.captcha !== session.code) {
    //   this.toolsService.getCaptcha();
    //   return '验证码不正确'
    // }
    const u = await this.adminService.add(user);
    await this.toolsService.sendRegistConfirimMailUser(
      user.email,
      user.userName,
      user.password,
      `${this.configService.get('HTTP_SERVER')}/${this.configService.get(
        'ADMIN_API_PREFIX',
      )}/user/validate/account/${u.validateToken}`,
    );
    return {
      userName: u.userName,
      email: u.email,
    };
  }

  @Get('/page')
  async getPage(@Query() dto: UserPageDto) {
    const deptList = await this.deptService.getList();
    const result = await this.adminService.getPage(
      dto.pageNo,
      dto.pageSize,
      dto.keywords,
      dto.orderBy,
      dto.deptId,
    );
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
      const { password, salt, validateToken, ...retUserInfo } = result;

      const resultBean = {
        code: 0,
        message: 'success',
        success: true,
        data: { user: retUserInfo, roles: [], permissions: [] },
      };

      const userRoles = await this.roleService.userRoleRepository.find({
        where: {
          userId: req.user.userId,
        },
      });
      const roleCodes = [];
      const roleIds: number[] = [];
      for (const userRole of userRoles) {
        roleIds.push(userRole.roleId);
      }
      if (!roleIds.length) {
        return resultBean;
      }
      const roles = await this.roleService.repository.find({
        where: {
          id: In(roleIds),
        },
      });
      for (const role of roles) {
        roleCodes.push(role.code);
      }
      const roleMenus = await this.roleService.roleMenuRepository.find({
        where: {
          roleId: In(roleIds),
        },
      });
      const menuIds: number[] = [];
      for (const userRole of roleMenus) {
        menuIds.push(userRole.menuId);
      }
      if (!menuIds.length) {
        return resultBean;
      }
      const menus = await this.menuService.repository.find({
        where: {
          id: In(menuIds),
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
    return await this.adminService.getById(dto.id);
  }

  @ApiOperation({
    summary: '根据ID数组查询用户',
    description: '根据ID数组查询用户',
  })
  @Get('/getByIds')
  async getByIds(@Query() dto: IdsDto) {
    return await this.adminService.getByIds(dto.ids);
  }

  @ApiOperation({
    summary: '假删除用户',
    description: '假删除用户',
  })
  @Post('/del')
  async del(@Body() dto: IdDto) {
    return await this.adminService.destroy(dto.id);
  }

  @Put('updatePassword')
  @ApiOperation({ summary: '更新用户密码' })
  async updatePassword(
    @Query('id') id,
    @Query('password') password: string,
    @Request() request,
  ) {
    const cond = {} as any;
    cond.userId = request.user.userId;
    cond.password = password;
    await this.adminService.updatePassword(id, cond);
    return '修改成功';
  }

  @ApiOperation({
    summary: '修改用户状态',
    description: '修改用户状态',
  })
  @Post('/update-status')
  async setStatus(@Body() dto: IdStatusDto) {
    const result = await this.adminService.adminRepository
      .createQueryBuilder()
      .update()
      .set({
        status: dto.status,
      })
      .where('id = :id', { id: dto.id })
      .execute();
    if (result.affected > 0) {
      return {
        code: 0,
        success: true,
        message: 'success',
        data: result,
      };
    } else {
      return {
        code: -1,
        success: false,
        message: 'fail',
        data: result,
      };
    }
  }

  @Put('/update')
  @Keep()
  async update(@Body() dto: UserDto) {
    const model = plainToClass(Admin, dto);
    const isRepeat = await this.adminService.adminRepository
      .createQueryBuilder()
      .where({ id: Not(model.id) })
      .andWhere([
        { userName: Equal(model.userName.trim()) },
        { mobile: Equal(model.mobile.trim()) },
        { email: Equal(model.email.trim()) },
      ])
      .getCount();
    if (isRepeat > 0) {
      return {
        code: -1,
        success: false,
        message: '账号、手机号、邮箱重复！',
        data: null,
      };
    } else {
      const result = await this.adminService.adminRepository.save(model);
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
