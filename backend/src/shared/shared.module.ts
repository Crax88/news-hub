import { ContainerModule, interfaces } from 'inversify';

import type { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { LoggerService } from './services/logger.service';

import { TYPES } from '../types';
import { ConfigServiceInterface } from '../common/interfaces/config.service.interface';
import { ConfigService } from './services/config.service';

export const SharedModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerServiceInterface>(TYPES.LOGGER).to(LoggerService).inSingletonScope();
	bind<ConfigServiceInterface>(TYPES.CONFIGSERVICE).to(ConfigService).inSingletonScope();
});
