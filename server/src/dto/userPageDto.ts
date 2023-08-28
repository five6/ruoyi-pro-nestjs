import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './commonDto';
export class UserPageDto extends PageDto {
  @ApiProperty({ name: 'deptId', required: false })
  deptId: number;
}
