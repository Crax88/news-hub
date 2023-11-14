import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from '../common/interfaces/middleware.interface';
import multer from 'multer';
import fs from 'fs';

export class UploadsMiddleware implements MiddlewareInterface {
	private uploadDir: string;
	constructor(uploadDir: string) {
		this.uploadDir = uploadDir;
	}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		multer({
			storage: multer.diskStorage({
				destination: (req, file, cb) => {
					if (!fs.existsSync(this.uploadDir)) {
						fs.mkdirSync(this.uploadDir);
					}
					cb(null, this.uploadDir);
				},
				filename: (req, file, cb) => {
					cb(null, Date.now() + '-' + file.originalname);
				},
			}),
			fileFilter: (req, file, cb) => {
				// file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
				cb(null, true);
			},
		}).single('file')(req, res, next);
	}
}
