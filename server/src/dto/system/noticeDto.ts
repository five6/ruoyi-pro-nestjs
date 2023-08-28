import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PageDto } from '../commonDto';
import { ApiProperty } from '@nestjs/swagger';
import { CommonStatusEnum } from '../../Enum/Global';

export class NoticeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'content', required: true })
  content: string;

  @IsInt()
  @ApiProperty({
    name: 'status',
    default: CommonStatusEnum.ENABLE,
    required: true,
  })
  status: number;

  @ApiProperty({ name: 'remark', required: false })
  remark: string;
}

export class NoticePageDto extends PageDto {
  @ApiProperty({ name: 'status', required: false })
  title: string;

  @ApiProperty({ name: 'status', required: false })
  status: number;
}
