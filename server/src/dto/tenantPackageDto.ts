import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TenantPackageDto {
  @IsNotEmpty()
  @ApiProperty({ name: '租户套餐名称' })
  name: string;

  @ApiProperty({ name: '备注' })
  remark: string;

  @ApiProperty({ name: '关联的菜单编号' })
  menuIds: string;

  @ApiProperty({ name: '状态' })
  status: number;
}
