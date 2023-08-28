import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '../constants/decorator.contants';

/**
 * 判断当前用户是否有permissions
 */
export const HasPermission = <T>(...permissions: T[]) =>
  SetMetadata(PERMISSIONS, permissions);
