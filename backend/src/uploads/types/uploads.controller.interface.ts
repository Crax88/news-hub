import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller';

export interface UploadsControllerInterface extends BaseController {
	upload: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	download: (req: Request<{ path: string }>, res: Response, next: NextFunction) => Promise<void>;
}
