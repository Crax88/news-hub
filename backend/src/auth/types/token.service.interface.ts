import { TokenPayloadDto } from './dto';

export interface TokenServiceInterface {
	generateToken: (userId: number) => Promise<string>;
	validateToken: (token: string, salt: string) => Promise<TokenPayloadDto | null>;
}
