import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class DeptDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'name', required: true })
  name: string;

  @IsEmail()
  @ApiProperty({ name: 'email', required: false })
  email: string;

  @ApiProperty({ name: 'leaderUserId', required: false })
  leaderUserId: string;

  @IsMobilePhone()
  @ApiProperty({ name: 'mobile', required: false })
  mobile: string;

  @ApiProperty({ name: 'sort', required: true })
  sort: number;

  @ApiProperty({ name: 'parentId' })
  parentId: number;

  @ApiProperty({ name: 'status' })
  status: number;
}
