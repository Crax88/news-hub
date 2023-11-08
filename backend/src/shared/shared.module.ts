import { ContainerModule, interfaces } from 'inversify';

import type { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { LoggerService } from './services/logger.service';

import { TYPES } from '../types';

export const SharedModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerServiceInterface>(TYPES.LOGGER).to(LoggerService).inSingletonScope();
});
