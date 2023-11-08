import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '../types';
import { AuthControllerInterface } from './types/auth.controller.interface';
import { AuthController } from './auth.controller';
import { AuthServiceInterface } from './types/auth.service.interface';
import { AuthService } from './auth.service';
import { PasswordServiceInterface } from './types/password.service.interface';
import { PasswordService } from './password.service';
import { TokenServiceInterface } from './types/token.service.interface';
import { TokenService } from './token.service';

export const AuthModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<AuthControllerInterface>(TYPES.AUTHCONTROLLER).to(AuthController).inSingletonScope();
	bind<AuthServiceInterface>(TYPES.AUTHSERVICE).to(AuthService).inSingletonScope();
	bind<PasswordServiceInterface>(TYPES.PASSWORDSERVICE).to(PasswordService).inSingletonScope();
	bind<TokenServiceInterface>(TYPES.TOKENSERVICE).to(TokenService).inSingletonScope();
});
