import 'reflect-metadata';
import express from 'express';
import { injectable } from 'inversify';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import type { Express } from 'express';
import type { CorsOptions } from 'cors';
import type { Server } from 'node:http';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor() {
		this.port = 3000;
		this.app = express();
	}

	async init(): Promise<void> {
		this.useMiddlewares();
		this.server = this.app.listen(this.port, () => {
			console.log('Server started');
		});
		process.on('uncaughtException', (err) => {
			console.error(err);
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
				if (!origin) {
					callback(new Error('Not Allowed by CORS'));
				} else {
					callback(null, true);
				}
			},
			credentials: true,
			optionsSuccessStatus: 200,
		};
		this.app.use(cors(corsOptions));
	}
}
