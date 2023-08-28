import { ConsoleLogger } from '@nestjs/common';
import { logger } from '../../middleware/logger.middleware';
export class AzLogger extends ConsoleLogger {
  log(message: string) {
    logger.info(message);
    super.log(message);
  }

  error(message: string, trace?: string) {
    logger.error(message, trace);
    super.error(message, trace);
  }

  warn(message: string) {
    logger.warn(message);
    super.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
    super.debug(message);
  }

  verbose(message: string) {
    logger.verbose(message);
    super.verbose(message);
  }

  json(message: object) {
    logger.info(message);
    super.log(message);
  }
}
