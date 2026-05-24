export class User {
	id: number;
	email: string;
	phone: string;
	name: string;
	passwordHash: string;
	systemRole: string;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date | null;

	constructor(data: User) {
		this.id = data.id;
		this.email = data.email;
		this.phone = data.phone;
		this.name = data.name;
		this.passwordHash = data.passwordHash;
		this.systemRole = data.systemRole;
		this.deletedAt = data.deletedAt;
		this.createdAt = data.createdAt ?? new Date();
		this.updatedAt = data.updatedAt ?? new Date();
	}
}