import { User } from '@prisma/client';

export interface UsersRepositoryInterface {
	create: (email: string, password: string) => Promise<User>;
	findByEmail: (email: string) => Promise<User | null>;
	findById: (id: number) => Promise<User | null>;
}
