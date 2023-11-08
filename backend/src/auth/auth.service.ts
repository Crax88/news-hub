import { inject, injectable } from 'inversify';
import { AuthServiceInterface } from './types/auth.service.interface';
import { SignInDto, SignUpDto } from './types/dto';
import { TYPES } from '../types';
import { PasswordServiceInterface } from './types/password.service.interface';
import { UsersServiceInterface } from '../users/types/users.service.interface';
import { TokenServiceInterface } from './types/token.service.interface';

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
			throw new Error('Email already exists');
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
			throw new Error('Invalid credentials');
		}
		const token = await this.tokenService.generateToken(candidate.id);
		return { token };
	}
}
