import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { PageDto } from '../commonDto';

export class DeptDto {
  @ApiProperty({ name: 'id', required: false })
  id?: string;

  @IsNotEmpty()
  @ApiProperty({ name: 'name', required: true })
  name: string;

  @ApiProperty({ name: 'email', required: false })
  email: string;

  @ApiProperty({ name: 'leaderUserId', required: false })
  leaderUserId: string;

  @ApiProperty({ name: 'mobile', required: false })
  mobile: string;

  @ApiProperty({ name: 'sort', required: true })
  sort: number;

  @ApiProperty({ name: 'parentId' })
  parentId: string;

  @ApiProperty({ name: 'status' })
  status: number;
}

export class DeptPageDto extends PageDto {
  @ApiProperty({ name: 'name', required: false })
  name: string;

  @ApiProperty({ name: 'status', required: false })
  status: number;
}
