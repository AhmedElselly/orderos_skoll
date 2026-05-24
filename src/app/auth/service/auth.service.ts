import { SystemRole } from "../../user/enums";
import { createUser, findUserExistsByEmailOrPhone } from "../../user/repository/users.repo";
import { AuthDto } from "../dto/auth.dto";
import { hashPassword } from "../utils";

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


	}
}