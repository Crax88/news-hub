import { New } from '@prisma/client';
import type { CreateNewDto, UpdateNewDto } from './dto';

export interface NewsServiceInterface {
	createNew: (dto: CreateNewDto, userId: number) => Promise<New>;
	updateNew: (newId: number, dto: UpdateNewDto, userId: number) => Promise<New>;
	deleteNew: (newId: number, userId: number) => Promise<void>;
	getNews: () => Promise<New[]>;
}
