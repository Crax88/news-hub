import { Container } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExceptionFilterInterface } from './common/interfaces/exeptionFilter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { config } from 'dotenv';
import { NewsModule } from './news/news.module';

export interface IBootsrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootsrapReturn> {
	if (!process.env.USE_ENVS) {
		config();
	}
	const appContainer = new Container();

	appContainer.bind<App>(TYPES.APPLICATION).to(App).inSingletonScope();
	appContainer
		.bind<ExceptionFilterInterface>(TYPES.EXCEPTIONFILTER)
		.to(ExceptionFilter)
		.inSingletonScope();
	appContainer.load(SharedModule, AuthModule, UsersModule, NewsModule);

	const app = appContainer.get<App>(TYPES.APPLICATION);

	await app.init();

	return { app, appContainer };
}

export const boot = bootstrap();
