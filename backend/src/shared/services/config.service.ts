import { inject, injectable } from 'inversify';
import { ConfigServiceInterface } from '../../common/interfaces/config.service.interface';
import { TYPES } from '../../types';
import { LoggerServiceInterface } from '../../common/interfaces/logger.service.interface';

@injectable()
export class ConfigService implements ConfigServiceInterface {
	private config = {
		API_PORT: '',
		NODE_ENV: '',
		DB_NAME: '',
		DB_USER: '',
		DB_PORT: '',
		DB_PASSWORD: '',
		DB_HOST: '',
		ACCESS_TOKEN_SECRET: '',
		ACCESS_TOKEN_EXPIRES: '',
		SALT: '',
		ALLOWED_ORIGINS: '',
	};
	constructor(@inject(TYPES.LOGGER) private loggerService: LoggerServiceInterface) {
		try {
			for (const param in this.config) {
				const envParam = process.env[param];
				if (!envParam) {
					throw new Error(`Parameter ${param} is not defined in the env`);
				}
				this.config[param as keyof typeof this.config] = envParam;
			}
			this.loggerService.info(`[ConfigService] Successfully load env configuration`);
		} catch (error) {
			error instanceof Error && this.loggerService.error(`[ConfigService] ${error.message}`, error);
		}
	}

	get(key: string): string {
		return this.config[key as keyof typeof this.config];
	}
}
