/**
 *
 */
import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/decorator.contants';

/**
 *  跳过检测装饰器
 * @constructor
 */
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
