import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './../commonDto';

export class DictDataPageDto extends PageDto {
  @ApiProperty({ name: 'label', required: false })
  label: string;

  @ApiProperty({ name: 'dictType', required: false })
  dictType: string;

  @ApiProperty({ name: 'status', required: false })
  status: number;
}
