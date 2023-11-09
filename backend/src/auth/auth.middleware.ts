import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { MiddlewareInterface } from '../common/interfaces/middleware.interface';
import { TokenServiceInterface } from './types/token.service.interface';
import { TYPES } from '../types';

@injectable()
export class AuthMiddleware implements MiddlewareInterface {
	constructor(@inject(TYPES.TOKENSERVICE) private tokensService: TokenServiceInterface) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(' ')[1];
				const tokenData = await this.tokensService.validateToken(token);
				if (tokenData) {
					req.userId = tokenData.userId;
				}
			}
			next();
		} catch (error) {
			next();
		}
	}
}
