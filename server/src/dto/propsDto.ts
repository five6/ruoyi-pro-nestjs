import { IsInt, IsString, IsEmail } from 'class-validator';

export class PropsDto {
  @IsString()
  name: string;

  description: string;
}
