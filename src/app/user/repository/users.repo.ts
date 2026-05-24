import { db } from "../../../common/knex/knex";
import { User } from "../entity/user.entity";

const mapRowToUser = (row: any): User => {
	return new User({
		id: row.id,
		email: row.email,
		phone: row.phone,
		name: row.name,
		passwordHash: row.passwordHash,
		systemRole: row.systemRole,
		deletedAt: row.deletedAt,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt
	})
}

export async function findByEmail(email: string): Promise<User | null> {
	const row = await db('users')
		.where('email', email)
		.whereNull('deletedAt')
		.first();

	if (!row) return null;

	return mapRowToUser(row);
}
export async function findUserExistsByEmailOrPhone(email: string, phone: string): Promise<Boolean> {
	const result = await db.raw(`select exists (select 1 from users where email = ? or phone = ? and deleted_at is null) as "exists"`, [email, phone]);
	return result.rows[0].exists;
}

export async function createUser(user: Partial<User>): Promise<User> {
	const [row] = await db('users')
		.insert({
			email: user.email,
			phone: user.phone,
			name: user.name,
			password_hash: user.passwordHash,
			system_role: user.systemRole,
			created_at: user.createdAt,
			updated_at: user.updatedAt,
		})
		.returning('*');

	return mapRowToUser(row);
}