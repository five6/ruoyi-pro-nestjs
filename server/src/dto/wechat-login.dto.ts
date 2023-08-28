import { ApiProperty, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { IsInt, IsString, IsEmail } from 'class-validator';

export class WechatLoginDto {
  @IsString()
  @ApiProperty({ description: '微信code' })
  code: string;

  @ApiProperty({ description: '微信用户方法获取encryptedData' })
  encryptedData: string;

  @ApiProperty({ description: '微信用户方法获取iv' })
  iv: string;
}
