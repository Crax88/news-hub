import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { MiddlewareInterface } from '../common/interfaces/middleware.interface';
import { TokenServiceInterface } from './types/token.service.interface';
import { TYPES } from '../types';
import { ConfigServiceInterface } from '../common/interfaces/config.service.interface';
import { CookieServiceInterface } from './types/cookie.service.interface';

@injectable()
export class AuthMiddleware implements MiddlewareInterface {
	constructor(
		@inject(TYPES.TOKENSERVICE) private tokensService: TokenServiceInterface,
		@inject(TYPES.CONFIGSERVICE) private configService: ConfigServiceInterface,
		@inject(TYPES.COOKIESERVICE) private cookieService: CookieServiceInterface,
	) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const tokenCookie = req.headers.cookie;
			const token = tokenCookie?.split('=')[1];
			if (token) {
				const tokenData = await this.tokensService.validateToken(token);
				if (tokenData) {
					req.userId = tokenData.userId;
					const newToken = await this.tokensService.generateToken(tokenData.userId);
					this.cookieService.setToken(res, newToken);
				}
			}
			next();
		} catch (error) {
			next();
		}
	}
}
