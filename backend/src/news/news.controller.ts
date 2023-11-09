import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';

import { Request, Response, NextFunction } from 'express';
import { CreateNewDto, UpdateNewDto } from './types/dto';
import { BaseController } from '../common/base.controller';

import { NewsControllerInterface } from './types/news.controller.interface';
import { NewsServiceInterface } from './types/news.service.interface';
import { ValidationMiddleware } from '../common/validation.middleware';
import { AuthGuard } from '../auth/auth.guard';

@injectable()
export class NewsController extends BaseController implements NewsControllerInterface {
	constructor(
		@inject(TYPES.LOGGER) loggerService: LoggerServiceInterface,
		@inject(TYPES.NEWSSERVICE) private newsService: NewsServiceInterface,
	) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/news', method: 'get', handler: this.getNews },
			{
				path: '/news',
				method: 'post',
				handler: this.createNew,
				middlewares: [new AuthGuard(), new ValidationMiddleware(CreateNewDto)],
			},
			{
				path: '/news/:id',
				method: 'put',
				handler: this.updateNew,
				middlewares: [new AuthGuard(), new ValidationMiddleware(UpdateNewDto)],
			},
			{
				path: '/news/:id',
				method: 'delete',
				handler: this.deleteNew,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async getNews(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const news = await this.newsService.getNews();
			this.ok(res, { news });
		} catch (error) {
			next(error);
		}
	}

	async createNew(
		req: Request<{}, {}, CreateNewDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const newNew = await this.newsService.createNew(req.body, req.userId);
			this.ok(res, { new: newNew });
		} catch (error) {
			next(error);
		}
	}

	async updateNew(
		req: Request<{ id: string }, {}, UpdateNewDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const updatedNew = await this.newsService.updateNew(+req.params.id, req.body, req.userId);
			this.ok(res, { new: updatedNew });
		} catch (error) {
			next(error);
		}
	}

	async deleteNew(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		try {
			await this.newsService.deleteNew(+req.params.id, req.userId);
			this.ok(res, { new: {} });
		} catch (error) {
			next(error);
		}
	}
}
