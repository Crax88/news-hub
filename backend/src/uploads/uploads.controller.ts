import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { UploadsControllerInterface } from './types/uploads.controller.interface';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../common/interfaces/logger.service.interface';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UploadsMiddleware } from './upload.middleware';
import fs from 'fs';
import path from 'path';
import { HttpError } from '../errors/httpError';
import { ConfigServiceInterface } from '../common/interfaces/config.service.interface';

@injectable()
export class UploadsController extends BaseController implements UploadsControllerInterface {
	constructor(
		@inject(TYPES.LOGGER) loggerService: LoggerServiceInterface,
		@inject(TYPES.CONFIGSERVICE) private configService: ConfigServiceInterface,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				method: 'post',
				path: '/upload',
				handler: this.upload,
				middlewares: [new AuthGuard(), new UploadsMiddleware('storage')],
			},
			{ method: 'get', path: '/upload/*', handler: this.download },
		]);
	}

	async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
		// TODO
		// move to service
		const base = this.configService.get('DOWNLOAD_URL') ?? 'http://localhost:4000/api/upload';
		this.ok(res, { path: `${base}/${req.file?.path}` });
	}

	async download(req: Request, res: Response, next: NextFunction): Promise<void> {
		// TODO
		// move to service
		if (fs.existsSync(process.cwd() + '/' + req.params[0])) {
			const name = path.basename(process.cwd() + '/' + req.params[0]);
			const ext = path.extname(process.cwd() + '/' + req.params[0]);
			return res.download(process.cwd() + '/' + req.params[0], `${name}.${ext}`);
		} else {
			next(new HttpError(404, 'Not found', 'Uploads Controller'));
		}
	}
}
