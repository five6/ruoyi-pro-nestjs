import { ApiProperty, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { IsInt, IsString, IsEmail } from 'class-validator';

// 邮件内附加道具
export class EmailProps {
  count: number;
  propsId: string;
}

export class EmailDto {
  @IsString()
  title?: string;
  content?: string;

  to?: string[];

  props?: EmailProps[];
}
