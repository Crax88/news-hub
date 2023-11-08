import { inject, injectable } from 'inversify';
import { UsersServiceInterface } from './types/users.service.interface';
import { TYPES } from '../types';
import { UsersRepositoryInterface } from './types/users.repository.interface';
import { User } from '@prisma/client';

@injectable()
export class UsersService implements UsersServiceInterface {
	constructor(@inject(TYPES.USERSREPOSITORY) private usersRepository: UsersRepositoryInterface) {}

	async createUser(email: string, password: string): Promise<User> {
		const newUser = await this.usersRepository.create(email, password);
		return newUser;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = await this.usersRepository.findByEmail(email);
		return user ?? null;
	}
}
