import { SetMetadata } from '@nestjs/common';
import { HAS_PERMISSION } from '../constants/decorator.contants';

/**
 * 判断当前用户是否有permissions
 */
export const hasPermission = <T>(...permissions: T[]) =>
  SetMetadata(HAS_PERMISSION, permissions);
