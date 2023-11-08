import { NextFunction, Request, Response } from 'express';

import { BaseController } from '../../common/base.controller';

export interface AuthControllerInterface extends BaseController {
	signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
