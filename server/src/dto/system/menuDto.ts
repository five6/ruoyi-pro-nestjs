import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { MenuEnum } from '../../Enum/Global';

export class MenuDto {
  @ApiProperty({ name: 'parentId' })
  parentId: number;

  @ApiProperty({ name: 'name', required: true })
  name: string;

  @IsNumber()
  @ApiProperty({ name: 'type', required: true })
  type: number;

  @ApiProperty({ name: 'sort', required: false })
  sort: string;

  @ApiProperty({ name: 'path', required: false })
  path: string;

  @ApiProperty({ name: 'icon', required: false })
  icon: string;

  @ApiProperty({ name: 'component', required: false })
  component: string;

  @ApiProperty({ name: 'componentName', required: false })
  componentName: string;

  @IsBoolean()
  @ApiProperty({ name: 'visible', required: false, default: true })
  visible: boolean;

  @IsBoolean()
  @ApiProperty({ name: 'keepAlive', required: true })
  keepAlive: boolean;

  @ApiProperty({ name: 'alwaysShow', required: true })
  alwaysShow: boolean;

  @IsString()
  @ApiProperty({ name: 'permission', required: false })
  permission: string;
}
