import { injectable } from 'inversify';
import { TokenServiceInterface } from './types/token.service.interface';
import { TokenPayloadDto } from './types/dto';
import { sign, verify } from 'jsonwebtoken';

@injectable()
export class TokenService implements TokenServiceInterface {
	async generateToken(userId: number): Promise<string> {
		const token = await sign({ userId }, 'TOKEN_SECRET', {
			expiresIn: '1d',
		});
		return token;
	}

	async validateToken(token: string): Promise<TokenPayloadDto | null> {
		try {
			const decoded = verify(token, 'TOKEN_SECRET');
			return decoded as TokenPayloadDto;
		} catch (error) {
			return null;
		}
	}
}
