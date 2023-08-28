import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from '../commonDto';
export class UserPageDto extends PageDto {
  @ApiProperty({ name: 'deptId', required: false })
  deptId: string;

  @ApiProperty({ name: 'mobile', required: false })
  mobile: string;

  @ApiProperty({ name: 'status', required: false })
  status: number;

  @ApiProperty({ name: 'userName', required: false })
  userName: number;

  @ApiProperty({ name: 'createTime', required: false })
  createTime: Date[];
}
