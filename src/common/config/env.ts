import z from 'zod';

const schema = z.object({
	PORT: z.string().default('3000'),
	DB_HOST: z.string().default('localhost'),
	DB_PORT: z.string().default('5432'),
	DB_USER: z.string().default('postgres'),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string().default('order_os_db'),
	DB_POOL_MAX: z.string().default('10'),
});

const parsed = schema.parse(process.env);

export const env = {
	port: Number(parsed.PORT),
	db: {
		host: parsed.DB_HOST,
		port: Number(parsed.DB_PORT),
		user: parsed.DB_USER,
		password: parsed.DB_PASSWORD,
		name: parsed.DB_NAME,
		poolMax: Number(parsed.DB_POOL_MAX),
	}
};