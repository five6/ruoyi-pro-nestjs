export class WxUserDto {
  openId: string;
  id?: string;
  status: number;
}

export class AddPlayerDto {
  nickName: string;
  status: number;
  avatar?: string;
}
