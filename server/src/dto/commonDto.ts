import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
//分页查询DTO
@Injectable()
export class PageDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ name: 'pageNo', required: true, default: 1 })
  pageNo: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ name: 'pageSize', required: true, default: 10 })
  pageSize: number;

  @ApiProperty({ name: 'keywords', required: false })
  keywords: string;

  @ApiProperty({ name: 'orderBy', required: false })
  orderBy: string;
}

//列表查询DTO
@Injectable()
export class ListDto {
  @ApiProperty({ name: 'keywords', required: false })
  keywords: string;

  @ApiProperty({ name: 'orderBy', required: false })
  orderBy: string;
}

//ids DTO
@Injectable()
export class IdsDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ name: 'ids', required: true })
  ids: number[];
}
//id DTO
@Injectable()
export class IdDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'id', required: true })
  id: number;
}
@Injectable()
export class RoleIdDto {
  @ApiProperty({ name: 'roleId' })
  roleId: number;
}

//Id Status DTO
@Injectable()
export class IdStatusDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'id', required: true })
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'status', required: true })
  status: number;
}
