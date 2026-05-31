import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { SystemRole } from "../../user/enums";

export class AuthDto {
	@IsEmail()
	email!: string;

	@MinLength(11)
	@MaxLength(15)
	phone!: string;

	@MinLength(3)
	@IsString()
	name!: string;

	@IsEnum(SystemRole)
	systemRole!: SystemRole;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}, {
		message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
	})
	password!: string;
}

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}