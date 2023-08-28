import { ApiProperty, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { IsInt, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: '用户名' })
  userName: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '验证码' })
  captcha?: string;
}
