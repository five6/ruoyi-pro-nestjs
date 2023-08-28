import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'name', required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ name: 'code', required: true })
  code: string;

  @ApiProperty({ name: 'type', default: 2 })
  type: string;

  @IsNumber()
  @ApiProperty({ name: 'sort', required: true, default: 0 })
  sort: number;

  @ApiProperty({ name: 'remark' })
  remark: string;
}
