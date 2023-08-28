import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleMenuDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'roleId', required: true })
  roleId: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ name: 'menuIds', required: true })
  menuIds: string[];
}
