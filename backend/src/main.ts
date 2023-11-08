import { Container } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import { SharedModule } from './shared/shared.module';

export interface IBootsrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootsrapReturn> {
	const appContainer = new Container();
	appContainer.bind<App>(TYPES.APPLICATION).to(App).inSingletonScope();
	appContainer.load(SharedModule);
	const app = appContainer.get<App>(TYPES.APPLICATION);

	await app.init();

	return { app, appContainer };
}

export const boot = bootstrap();
