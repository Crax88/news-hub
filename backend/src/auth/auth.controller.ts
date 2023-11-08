import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { AuthControllerInterface } from './types/auth.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { SignInDto, SignUpDto } from './types/dto';
import { BaseController } from '../common/base.controller';
import { AuthServiceInterface } from './types/auth.service.interface';

@injectable()
export class AuthController extends BaseController implements AuthControllerInterface {
	constructor(
		@inject(TYPES.LOGGER) loggerService: LoggerServiceInterface,
		@inject(TYPES.AUTHSERVICE) private authService: AuthServiceInterface,
	) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/sign-up', method: 'post', handler: this.signUp },
			{ path: '/sign-in', method: 'post', handler: this.signIn },
		]);
	}

	async signUp(req: Request<{}, {}, SignUpDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { token } = await this.authService.signUp(req.body);
			this.ok(res, { token });
		} catch (error) {
			next(error);
		}
	}

	async signIn(req: Request<{}, {}, SignInDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { token } = await this.authService.signIn(req.body);
			this.ok(res, { token });
		} catch (error) {
			next(error);
		}
	}
}
