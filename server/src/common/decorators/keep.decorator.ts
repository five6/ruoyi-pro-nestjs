import { SetMetadata } from '@nestjs/common';
import { KEEP_RESPONSE_METADATA } from '../constants/decorator.contants';

/**
 * 保留原有response格式返回装饰器
 */
export const Keep = () => SetMetadata(KEEP_RESPONSE_METADATA, true);
