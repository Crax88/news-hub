export interface User {
	id: number;
	email: string;
	password: string;
}

export interface UsersServiceInterface {
	createUser: (email: string, password: string) => Promise<User>;
	findUserByEmail: (email: string) => Promise<User | null>;
}
