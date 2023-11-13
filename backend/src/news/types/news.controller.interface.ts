import { NextFunction, Request, Response } from 'express';

import { BaseController } from '../../common/base.controller';

export interface NewsControllerInterface extends BaseController {
	getNews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getNew: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>;
	createNew: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updateNew: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>;
	deleteNew: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>;
}
