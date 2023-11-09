import {
	IsString,
	IsNotEmpty,
	MinLength,
	MaxLength,
	IsOptional,
	IsBoolean,
	IsDateString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateNewDto {
	@IsNotEmpty({ message: 'required' })
	@MinLength(3, { message: 'at least 8 characters' })
	@MaxLength(255, { message: 'max 255 characters' })
	@Transform(({ value }: TransformFnParams) => value.trim())
	@IsString()
	title: string;

	@IsNotEmpty({ message: 'required' })
	@MinLength(8, { message: 'at least 8 characters' })
	@Transform(({ value }: TransformFnParams) => value.trim())
	@IsString()
	body: string;

	@IsBoolean()
	@Transform(({ value }: TransformFnParams) => value === 'true')
	@IsOptional()
	isPublished: boolean;

	@IsDateString()
	@IsOptional()
	publishDate?: string;
}

export class UpdateNewDto extends CreateNewDto {}
