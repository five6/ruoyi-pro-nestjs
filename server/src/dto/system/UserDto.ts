import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UserDto {
  @ApiProperty({ name: 'id', required: false })
  id?: string;

  @IsNotEmpty()
  @ApiProperty({ name: 'username', required: true })
  userName: string;

  @ApiProperty({ name: 'nickname' })
  nickName: string;

  @ApiProperty({ name: 'avatar' })
  avatar: string;

  @ApiProperty({ name: 'birthday' })
  birthday: string;

  @IsNumber()
  @ApiProperty({ name: 'sex' })
  sex: number;

  @ApiProperty({ name: 'email', required: true })
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ name: 'mobile', required: true })
  mobile: string;

  @ApiProperty({ name: 'idCard' })
  idCard: string;

  @ApiProperty({ name: 'roleId', required: true })
  roleId: string;

  @ApiProperty({ name: 'deptId', required: false })
  deptId: string;

  @ApiProperty({ name: 'remark', required: false })
  remark: string;
}
