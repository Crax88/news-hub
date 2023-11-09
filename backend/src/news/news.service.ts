import { injectable, inject } from 'inversify';
import { New } from '@prisma/client';
import { NewsServiceInterface } from './types/news.service.interface';
import { TYPES } from '../types';
import { NewsRepositoryInterface } from './types/news.repository.interface';
import { HttpError } from '../errors/httpError';
import { CreateNewDto, UpdateNewDto } from './types/dto';

@injectable()
export class NewsService implements NewsServiceInterface {
	constructor(@inject(TYPES.NEWSREPOSITORY) private newsRepository: NewsRepositoryInterface) {}

	async getNews(): Promise<New[]> {
		const news = await this.newsRepository.getNews();
		if (news.length === 0) {
			throw new HttpError(404, 'Not found');
		}

		return news;
	}

	async createNew(dto: CreateNewDto, userId: number): Promise<New> {
		const newNew = await this.newsRepository.create({
			title: dto.title,
			body: dto.body,
			authorId: userId,
			isPublished: dto.isPublished,
			publishDate: dto.isPublished ? new Date().toISOString() : dto.publishDate,
		});
		return newNew;
	}

	async updateNew(newId: number, dto: UpdateNewDto, userId: number): Promise<New> {
		const foundNew = await this.newsRepository.getById(newId);

		if (!foundNew) {
			throw new HttpError(404, 'Not found', 'NewsService');
		}

		if (foundNew.authorId !== userId) {
			throw new HttpError(403, 'Not authorized', 'NewsService');
		}

		const updatedNew = await this.newsRepository.update(newId, {
			title: dto.title,
			body: dto.body,
			isPublished: dto.isPublished,
			publishDate: dto.isPublished ? new Date().toISOString() : undefined,
		});

		if (!updatedNew) {
			throw new HttpError(404, 'Not found', 'NewsService');
		}

		return updatedNew;
	}

	async deleteNew(newId: number, userId: number): Promise<void> {
		const foundNew = await this.newsRepository.getById(newId);

		if (!foundNew) {
			throw new HttpError(404, 'Not found', 'NewsService');
		}

		if (foundNew.authorId !== userId) {
			throw new HttpError(403, 'Not authorized', 'NewsService');
		}

		await this.newsRepository.delete(newId);

		return;
	}
}
