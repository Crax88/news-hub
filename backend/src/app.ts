import 'reflect-metadata';
import express from 'express';
import { injectable, inject } from 'inversify';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';
import type { Server } from 'node:http';
import { TYPES } from './types';
import { LoggerServiceInterface } from './common/interfaces/logger.service.interface';
import { AuthControllerInterface } from './auth/types/auth.controller.interface';
import { ConfigServiceInterface } from './common/interfaces/config.service.interface';
import { ExceptionFilterInterface } from './common/interfaces/exeptionFilter.interface';
import { NewsControllerInterface } from './news/types/news.controller.interface';
import { PrismaService } from './shared/services/prisma.service';
import { MiddlewareInterface } from './common/interfaces/middleware.interface';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(
		@inject(TYPES.LOGGER) private loggerService: LoggerServiceInterface,
		@inject(TYPES.AUTHCONTROLLER) private authController: AuthControllerInterface,
		@inject(TYPES.CONFIGSERVICE) private configService: ConfigServiceInterface,
		@inject(TYPES.EXCEPTIONFILTER) private exceptionFilter: ExceptionFilterInterface,
		@inject(TYPES.NEWSCONTROLLER) private newsController: NewsControllerInterface,
		@inject(TYPES.AUTHMIDDLEWARE) private authMiddleware: MiddlewareInterface,
		@inject(TYPES.PRISMASERVICE) private prismaService: PrismaService,
	) {
		this.port = +this.configService.get('API_PORT');
		this.app = express();
	}

	async init(): Promise<void> {
		this.useMiddlewares();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port, () => {
			this.loggerService.info(`[App] Server started on port ${this.port}`);
		});
		process.on('uncaughtException', (err) => {
			this.loggerService.error(`[App] Uncaught exception ${err.message}`, err);
		});
	}

	close(): void {
		this.server.close();
	}

	private useMiddlewares(): void {
		this.app.use(json());
		this.app.use(cookieParser());
		this.app.use(helmet());

		const corsOptions: CorsOptions = {
			// origin: (origin, callback) => {
			// 	if (
			// 		!origin ||
			// 		(this.configService.get('ALLOWED_ORIGINS') &&
			// 			!this.configService.get('ALLOWED_ORIGINS').includes(origin))
			// 	) {
			// 		callback(new Error('Not Allowed by CORS'));
			// 	} else {
			// 		callback(null, this.configService.get('ALLOWED_ORIGINS').split(';'));
			// 	}
			// },
			origin: this.configService.get('ALLOWED_ORIGINS').split(';'),
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			credentials: true,
			optionsSuccessStatus: 200,
		};
		this.app.use(cors(corsOptions));

		this.app.use(this.authMiddleware.execute.bind(this.authMiddleware));

		// this.app.use((req, res, next) => {
		// 	res.setHeader(
		// 		'Access-Control-Allow-Headers',
		// 		'Origin, X-Requested-With, Content-Type, Accept',
		// 	);
		// 	next();
		// });
	}

	private useRoutes(): void {
		this.app.use('/api', this.authController.router);
		this.app.use('/api', this.newsController.router);
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
}
