import { New } from '@prisma/client';
import { CreateNewDto, UpdateNewDto } from './dto';

export interface NewsRepositoryInterface {
	create: (dto: CreateNewDto & { authorId: number }) => Promise<New>;
	update: (newId: number, dto: UpdateNewDto) => Promise<New | null>;
	delete: (newId: number) => Promise<New>;
	getNews: () => Promise<New[]>;
	getById: (newId: number) => Promise<New | null>;
}
