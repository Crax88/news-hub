import { Response } from 'express';

export interface CookieServiceInterface {
	setToken: (res: Response, token: string) => void;
	removeToken: (res: Response) => void;
}
