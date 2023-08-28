import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './../commonDto';

export class DictTypePageDto extends PageDto {
  @ApiProperty({ name: 'name', required: false })
  name: string;

  @ApiProperty({ name: 'type', required: false })
  type: string;

  @ApiProperty({ name: 'createTime', required: false })
  createTime: Date[];

  @ApiProperty({ name: 'status', required: false })
  status: number;
}
