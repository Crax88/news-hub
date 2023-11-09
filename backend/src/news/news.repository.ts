import { inject, injectable } from 'inversify';
import { New } from '@prisma/client';

import { TYPES } from '../types';
import { PrismaService } from '../shared/services/prisma.service';
import { NewsRepositoryInterface } from './types/news.repository.interface';
import { CreateNewDto, UpdateNewDto } from './types/dto';

@injectable()
export class NewsRepository implements NewsRepositoryInterface {
	constructor(@inject(TYPES.PRISMASERVICE) private prismaService: PrismaService) {}

	async create(dto: CreateNewDto & { authorId: number }): Promise<New> {
		return await this.prismaService.client.new.create({ data: dto });
	}

	async getById(newId: number): Promise<New | null> {
		return await this.prismaService.client.new.findFirst({ where: { id: newId } });
	}

	async delete(newId: number): Promise<New> {
		return await this.prismaService.client.new.delete({ where: { id: newId } });
	}

	async update(newId: number, dto: UpdateNewDto): Promise<New | null> {
		return await this.prismaService.client.new.update({
			data: dto,
			where: { id: newId },
			include: { author: { select: { id: true, email: true } } },
		});
	}

	async getNews(): Promise<New[]> {
		return await this.prismaService.client.new.findMany({
			include: { author: { select: { id: true, email: true } } },
		});
	}
}
