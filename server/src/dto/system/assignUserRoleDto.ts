import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignUserRoleDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'userId', required: true })
  userId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ name: 'roleIds', required: true })
  roleIds: number[];
}
