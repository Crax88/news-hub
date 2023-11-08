import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { ExceptionFilterInterface } from '../common/interfaces/exeptionFilter.interface';
import { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { TYPES } from '../types';

import { HttpError } from './httpError';
import { ValidationError } from './validationError';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
	constructor(@inject(TYPES.LOGGER) private loggerService: LoggerServiceInterface) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof ValidationError) {
			this.loggerService.warn(`[${err.context}] Error: ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).send({ errors: err.errors });
		} else if (err instanceof HttpError) {
			this.loggerService.warn(`[${err.context}] Error: ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).send({ errors: { error: [err.message] } });
		} else {
			this.loggerService.error(`[Error] ${err.message}`, err);
			res.status(500).send({ errors: { error: ['Internal server error'] } });
		}
	}
}
