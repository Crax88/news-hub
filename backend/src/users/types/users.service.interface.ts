import { User } from '@prisma/client';

export interface UsersServiceInterface {
	createUser: (email: string, password: string) => Promise<User>;
	findUserByEmail: (email: string) => Promise<User | null>;
	findUserById: (id: number) => Promise<User | null>;
}
