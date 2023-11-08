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

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(
		@inject(TYPES.LOGGER) private loggerService: LoggerServiceInterface,
		@inject(TYPES.AUTHCONTROLLER) private authController: AuthControllerInterface,
	) {
		this.port = 3000;
		this.app = express();
	}

	async init(): Promise<void> {
		this.useMiddlewares();
		this.useRoutes();
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
			origin: (origin, callback) => {
				callback(null, true);
				// if (!origin) {
				// 	callback(new Error('Not Allowed by CORS'));
				// } else {
				// }
			},
			credentials: true,
			optionsSuccessStatus: 200,
		};
		this.app.use(cors(corsOptions));
	}

	private useRoutes(): void {
		this.app.use('/api', this.authController.router);
	}
}
