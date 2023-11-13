import { inject, injectable } from 'inversify';
import { AuthServiceInterface } from './types/auth.service.interface';
import { SignInDto, SignUpDto } from './types/dto';
import { TYPES } from '../types';
import { PasswordServiceInterface } from './types/password.service.interface';
import { UsersServiceInterface } from '../users/types/users.service.interface';
import { TokenServiceInterface } from './types/token.service.interface';
import { HttpError } from '../errors/httpError';
import { ValidationError } from '../errors/validationError';

@injectable()
export class AuthService implements AuthServiceInterface {
	constructor(
		@inject(TYPES.PASSWORDSERVICE) private passwordService: PasswordServiceInterface,
		@inject(TYPES.USERSSERVICE) private usersService: UsersServiceInterface,
		@inject(TYPES.TOKENSERVICE) private tokenService: TokenServiceInterface,
	) {}
	async signUp(dto: SignUpDto): Promise<{ token: string }> {
		const candidate = await this.usersService.findUserByEmail(dto.email);
		if (candidate) {
			throw new ValidationError({ email: ['Already exist'] }, 'AuthService');
		}

		const salt = await this.passwordService.getSalt(10);
		const hash = await this.passwordService.getHash(dto.password, salt);

		const newUser = await this.usersService.createUser(dto.email, hash);

		const token = await this.tokenService.generateToken(newUser.id);

		return { token };
	}

	async signIn(dto: SignInDto): Promise<{ token: string }> {
		const candidate = await this.usersService.findUserByEmail(dto.email);
		if (!candidate) {
			throw new HttpError(400, 'Invalid credentials', 'AuthService');
		}
		const token = await this.tokenService.generateToken(candidate.id);
		return { token };
	}

	async getSession(userId: number): Promise<{ userId: number; email: string }> {
		const candidate = await this.usersService.findUserById(userId);
		if (!candidate) {
			throw new HttpError(403, 'Unauthorized', 'AuthService');
		}
		return { userId: candidate.id, email: candidate.email };
	}
}
