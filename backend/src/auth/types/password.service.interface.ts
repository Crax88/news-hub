export interface PasswordServiceInterface {
	getSalt: (rounds: number) => Promise<string>;
	getHash: (password: string, salt: string) => Promise<string>;
}
