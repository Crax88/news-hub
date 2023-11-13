import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { AuthControllerInterface } from './types/auth.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { SignInDto, SignUpDto } from './types/dto';
import { BaseController } from '../common/base.controller';
import { AuthServiceInterface } from './types/auth.service.interface';
import { ValidationMiddleware } from '../common/validation.middleware';
import { CookieServiceInterface } from './types/cookie.service.interface';
import { AuthGuard } from './auth.guard';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@injectable()
export class AuthController extends BaseController implements AuthControllerInterface {
	constructor(
		@inject(TYPES.LOGGER) loggerService: LoggerServiceInterface,
		@inject(TYPES.AUTHSERVICE) private authService: AuthServiceInterface,
		@inject(TYPES.COOKIESERVICE) private cookieService: CookieServiceInterface,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/sign-up',
				method: 'post',
				handler: this.signUp,
				middlewares: [new ValidationMiddleware(SignUpDto)],
			},
			{
				path: '/sign-in',
				method: 'post',
				handler: this.signIn,
				middlewares: [new ValidationMiddleware(SignInDto)],
			},
			{
				path: '/session',
				method: 'get',
				handler: this.getSession,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/sign-out',
				method: 'post',
				handler: this.signOut,
			},
		]);
	}

	async signUp(req: Request<{}, {}, SignUpDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { token } = await this.authService.signUp(req.body);
			this.cookieService.setToken(res, token);
			this.ok(res, {});
		} catch (error) {
			next(error);
		}
	}

	async signIn(req: Request<{}, {}, SignInDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { token } = await this.authService.signIn(req.body);
			this.cookieService.setToken(res, token);
			this.ok(res, {});
		} catch (error) {
			next(error);
		}
	}

	async getSession(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const session = await this.authService.getSession(req.userId);
			this.ok(res, { session });
		} catch (error) {
			next(error);
		}
	}

	async signOut(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			this.cookieService.removeToken(res);
			this.ok(res, {});
		} catch (error) {
			next(error);
		}
	}
}
