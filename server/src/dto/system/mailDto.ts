import { Injectable } from '@nestjs/common';
import { PageDto } from '../commonDto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class MailAccountPageDto extends PageDto {
  @ApiProperty({ name: 'mail', required: false })
  mail: string;

  @ApiProperty({ name: 'userName', required: false })
  userName: string;
}

export class MailTemplatePageDto extends PageDto {
  @ApiProperty({ name: 'code', required: false })
  code: string;

  @ApiProperty({ name: 'name', required: false })
  name: string;

  @ApiProperty({ name: 'accountId', required: false })
  accountId: number;

  @ApiProperty({ name: 'status', required: false })
  status: number;

  @ApiProperty({ name: 'createTime', required: false })
  createTime: Date[];
}

export class MailLogPageDto extends PageDto {
  @ApiProperty({ name: 'templateId', required: false })
  templateId: string;

  @ApiProperty({ name: 'userId', required: false })
  userId: string;

  @ApiProperty({ name: 'accountId', required: false })
  accountId: string;

  @ApiProperty({ name: 'userType', required: false })
  userType: number;

  @ApiProperty({ name: 'sendStatus', required: false })
  sendStatus: string;

  @ApiProperty({ name: 'sendTime', required: false })
  sendTime: Date[];
}
