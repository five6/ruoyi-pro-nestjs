import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { RoleTypeEnum } from '../../Enum/Global';
import { PageDto } from '../commonDto';

export class RoleDto {
  @ApiProperty({ name: 'id', required: false })
  id?: string;

  @IsNotEmpty()
  @ApiProperty({ name: 'name', required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ name: 'code', required: true })
  code: string;

  @ApiProperty({ name: 'type', default: RoleTypeEnum.CUSTOM })
  type: number;

  @IsNumber()
  @ApiProperty({ name: 'sort', required: true, default: 0 })
  sort: number;

  @ApiProperty({ name: 'remark' })
  remark: string;
}

export class RolePageDto extends PageDto {
  @ApiProperty({ name: 'code', required: false })
  code: string;

  @ApiProperty({ name: 'name', required: false })
  name: string;

  @ApiProperty({ name: 'status', required: false })
  status: string;

  @ApiProperty({ name: 'name', required: false })
  createTime: Date[];
}
