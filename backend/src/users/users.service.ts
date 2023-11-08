import { injectable } from 'inversify';
import { User, UsersServiceInterface } from './types/users.service.interface';

@injectable()
export class UsersService implements UsersServiceInterface {
	private _users: User[] = [];

	async createUser(email: string, password: string): Promise<User> {
		const newUser = { id: this._users.length + 1, email, password };
		this._users.push(newUser);
		return newUser;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = this._users.find((u) => u.email === email);
		return user ?? null;
	}
}
