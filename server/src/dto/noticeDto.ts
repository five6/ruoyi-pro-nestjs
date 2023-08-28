import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NoticeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  noticeType: number;
}
