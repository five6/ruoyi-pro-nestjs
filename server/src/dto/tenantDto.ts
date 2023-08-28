import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TenantDto {
  @IsNotEmpty()
  @ApiProperty({ name: '租户名称' })
  name: string;

  @ApiProperty({ name: '联系人的用户编号' })
  contactUserId: string;

  @ApiProperty({ name: '联系人' })
  contactName: string;

  @ApiProperty({ name: '手机号码' })
  contactMobile: string;

  @ApiProperty({ name: '绑定域名' })
  domain: string;

  @ApiProperty({ name: '租户套餐编号' })
  packageId: string;

  @ApiProperty({ name: '过期时间' })
  expireTime: Date;

  @ApiProperty({ name: '账号数量' })
  accountCount: number;

  @ApiProperty({ name: '状态' })
  status: number;
}
