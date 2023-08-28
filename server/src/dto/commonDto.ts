import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
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
  ids: string[];
}
//id DTO
@Injectable()
export class IdDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'id', required: true })
  id: string;
}
@Injectable()
export class RoleIdDto {
  @ApiProperty({ name: 'roleId' })
  roleId: string;
}

//Id Status DTO
@Injectable()
export class IdStatusDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'id', required: true })
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'status', required: true })
  status: number;
}

@Injectable()
export class DestoryDto {
  @IsNotEmpty()
  @ApiProperty({ name: 'id', required: true })
  id: any;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ name: 'deleted', required: true })
  deleted: Date;
}
