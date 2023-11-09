import { NextFunction, Request, Response } from 'express';

import { MiddlewareInterface } from '../common/interfaces/middleware.interface';
import { HttpError } from '../errors/httpError';

export class AuthGuard implements MiddlewareInterface {
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.userId) {
			next();
		} else {
			next(new HttpError(401, 'unauthorized'));
		}
	}
}
