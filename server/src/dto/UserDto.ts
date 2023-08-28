import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'userName', required: true })
  userName: string;

  @ApiProperty({ name: 'nickName' })
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
  roleId: number;

  @ApiProperty({ name: 'deptId', required: false })
  deptId: number;

  @ApiProperty({ name: 'remark', required: false })
  remark: string;
}
