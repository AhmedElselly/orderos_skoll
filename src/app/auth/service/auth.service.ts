import id from "zod/v4/locales/id.js";
import { SystemRole } from "../../user/enums";
import { createUser, findByEmail, findUserExistsByEmailOrPhone } from "../../user/repository/users.repo";
import { AuthDto } from "../dto/auth.dto";
import { comparePasswords, createAccessToken, createRefreshToken, hashPassword, JwtPayload } from "../utils";

export class AuthService {
	async register(data: AuthDto): Promise<any> {
		if (data.systemRole === SystemRole.ADMIN) {
			throw new Error("Cannot register as a system admin.");
		}
		const existingUser = await findUserExistsByEmailOrPhone(data.email, data.phone);

		if (existingUser) {
			throw new Error("User with the provided email or phone already exists.");
		}

		const hashedPassword = await hashPassword(data.password);

		const now = new Date();

		const user = await createUser({
			email: data.email,
			phone: data.phone,
			name: data.name,
			passwordHash: hashedPassword,
			systemRole: data.systemRole,
			createdAt: now,
			updatedAt: now,
		});

		const payload = {
			userId: user.id,
			email: user.email,
			role: data.systemRole,
		}

		const accessToken = await createAccessToken(payload);
		const refreshToken = await createRefreshToken(payload);

		return {
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				email: user.email,
				phone: user.phone,
				systemRole: user.systemRole,
			}
		}
	}

	async login(email: string, password: string): Promise<any> {
		// find user by email
		const user = await findByEmail(email);
		console.log({ user })
		// if user not found, throw error
		if (!user) {
			throw new Error("Incorrect credentials.");
		}
		// compare password with stored hash
		const isMatch = await comparePasswords(password, user.passwordHash);
		// if password does not match, throw error
		if (!isMatch) {
			throw new Error("Incorrect credentials.");
		}
		// create access token and refresh token
		const payload = {
			userId: user.id,
			email: user.email,
			role: user.systemRole,
		}

		const accessToken = await createAccessToken(payload as JwtPayload);
		const refreshToken = await createRefreshToken(payload as JwtPayload);

		// return tokens and user info
		return {
			message: 'Login successful.',
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				email: user.email,
				phone: user.phone,
				systemRole: user.systemRole,
			}
		}
	}
}

const authService = new AuthService();

export default authService;