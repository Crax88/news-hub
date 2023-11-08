import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LoggerServiceInterface } from '../../common/interfaces/logger.service.interface';
import { TYPES } from '../../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.LOGGER) private loggerService: LoggerServiceInterface) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.info('[PrismaService] Successfully connect to DB');
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.error('[PrismaService] Error while connecting to DB: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
