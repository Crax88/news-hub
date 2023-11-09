import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '../types';
import { NewsControllerInterface } from './types/news.controller.interface';
import { NewsController } from './news.controller';
import { NewsServiceInterface } from './types/news.service.interface';
import { NewsService } from './news.service';
import { NewsRepositoryInterface } from './types/news.repository.interface';
import { NewsRepository } from './news.repository';

export const NewsModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<NewsControllerInterface>(TYPES.NEWSCONTROLLER).to(NewsController).inSingletonScope();
	bind<NewsServiceInterface>(TYPES.NEWSSERVICE).to(NewsService).inSingletonScope();
	bind<NewsRepositoryInterface>(TYPES.NEWSREPOSITORY).to(NewsRepository).inSingletonScope();
});
