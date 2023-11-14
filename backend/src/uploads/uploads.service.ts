import { injectable } from 'inversify';
import { UploadsServiceInterface } from './types/uploads.service.interface';

@injectable()
export class UploadsService implements UploadsServiceInterface {
	downloadFile: () => {};
}
