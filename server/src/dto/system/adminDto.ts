import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsString()
  @ApiProperty({ description: '用户名' })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '姓名' })
  nickName: string;

  @ApiProperty({ description: '用户密码' })
  password?: string;

  @IsEmail()
  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: '部门编号' })
  deptId: string;

  @IsMobilePhone()
  @ApiProperty({ description: '用户手机号' })
  mobile: string;

  @ApiProperty({ description: '验证码' })
  captcha?: string;

  @ApiProperty({ description: '头像' })
  avatar?: string;

  @ApiProperty({ description: '备注' })
  remark?: string;
}
