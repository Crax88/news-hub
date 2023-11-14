import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '../types';
import { UploadsControllerInterface } from './types/uploads.controller.interface';
import { UploadsController } from './uploads.controller';
import { UploadsServiceInterface } from './types/uploads.service.interface';
import { UploadsService } from './uploads.service';

export const UploadsModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<UploadsControllerInterface>(TYPES.UPLOADSCONTROLLER)
		.to(UploadsController)
		.inSingletonScope();
	bind<UploadsServiceInterface>(TYPES.UPLOADSSERVICE).to(UploadsService).inSingletonScope();
});
