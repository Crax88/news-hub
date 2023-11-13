import type { SignInDto, SignUpDto } from './dto';

export interface AuthServiceInterface {
	signIn: (dto: SignInDto) => Promise<{ token: string }>;
	signUp: (dto: SignUpDto) => Promise<{ token: string }>;
	getSession: (userId: number) => Promise<{ userId: number; email: string }>;
}
