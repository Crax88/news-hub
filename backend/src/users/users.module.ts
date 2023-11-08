import { ContainerModule, interfaces } from 'inversify';

import { UsersServiceInterface } from './types/users.service.interface';
import { UsersService } from './users.service';
import { TYPES } from '../types';

export const UsersModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<UsersServiceInterface>(TYPES.USERSSERVICE).to(UsersService).inSingletonScope();
});
