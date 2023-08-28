import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from '../commonDto';

export class NotifyTemplatePageDto extends PageDto {
  @ApiProperty({ name: 'name', required: false })
  name: string;

  @ApiProperty({ name: 'status', required: false })
  status: number;

  @ApiProperty({ name: 'code', required: false })
  code: number;

  @ApiProperty({ name: 'createTime', required: false })
  createTime: Date[];
}
