import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { UsersRepositoryInterface } from './types/users.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../shared/services/prisma.service';

@injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(@inject(TYPES.PRISMASERVICE) private prismaService: PrismaService) {}

	async create(email: string, password: string): Promise<User> {
		return await this.prismaService.client.user.create({ data: { email, password } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.prismaService.client.user.findFirst({ where: { email } });
	}
}
