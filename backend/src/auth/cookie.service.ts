import { injectable, inject } from 'inversify';
import { Response } from 'express';
import { CookieServiceInterface } from './types/cookie.service.interface';
import { TYPES } from '../types';
import { ConfigServiceInterface } from '../common/interfaces/config.service.interface';

@injectable()
export class CookieService implements CookieServiceInterface {
	constructor(@inject(TYPES.CONFIGSERVICE) private configService: ConfigServiceInterface) {}

	setToken(res: Response, token: string): void {
		const tokenKey = this.configService.get('TOKEN_KEY');
		const cookieExpires = this.configService.get('TOKEN_COOKIE_EXPIRES');
		if (tokenKey) {
			res.cookie(tokenKey, token, {
				httpOnly: true,
				maxAge: +cookieExpires * 24 * 60 * 60 * 100,
				domain: this.configService.get('ALLOWED_ORIGINS'),
			});
		}
	}

	removeToken(res: Response): void {
		const tokenKey = this.configService.get('TOKEN_KEY');
		if (tokenKey) {
			res.clearCookie(tokenKey);
		}
	}
}
