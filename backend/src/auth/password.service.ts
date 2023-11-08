import { injectable } from 'inversify';
import { hash, genSalt, compare } from 'bcryptjs';
import { PasswordServiceInterface } from './types/password.service.interface';

@injectable()
export class PasswordService implements PasswordServiceInterface {
	async getSalt(rounds: number): Promise<string> {
		return await genSalt(rounds);
	}

	async getHash(password: string, salt: string): Promise<string> {
		return await hash(password, salt);
	}

	async compare(password1: string, password2: string): Promise<boolean> {
		return await compare(password1, password2);
	}
}
