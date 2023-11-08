import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class SignUpDto {
	@IsEmail({}, { message: 'invalid format' })
	@IsNotEmpty({ message: 'required' })
	email: string;

	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.*]).{8,64}$/gm, {
		message: 'at least 8 characters long with 1 special character and capital character',
	})
	@IsNotEmpty({ message: 'required' })
	password: string;
}

export class SignInDto {
	@IsNotEmpty({ message: 'required' })
	email: string;

	@IsNotEmpty({ message: 'required' })
	pasword: string;
}

export interface TokenPayloadDto {
	userId: number;
}
