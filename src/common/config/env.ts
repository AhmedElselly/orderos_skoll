import { config } from 'dotenv';
import path from 'path';
import z from 'zod';

config({
	path: path.resolve(__dirname, '../../../.env'),
});

const schema = z.object({
	PORT: z.string().default('3000'),
	DB_HOST: z.string().default('localhost'),
	DB_PORT: z.string().default('5432'),
	DB_USER: z.string().default('postgres'),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string().default('order_os_db'),
	DB_POOL_MAX: z.string().default('10'),
	DB_MIGRATIONS_DIRECTORY: z.string(),
	DB_MIGRATIONS_EXTENSION: z.string(),
	ACCESS_SECRET_KEY: z.string(),
	REFRESH_SECRET_KEY: z.string(),
	ACCESS_TOKEN_EXPIRATION: z.string(),
	REFRESH_TOKEN_EXPIRATION: z.string(),
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
		migrationsDir: path.resolve(__dirname, "../../../", parsed.DB_MIGRATIONS_DIRECTORY),
		migrationsExt: parsed.DB_MIGRATIONS_EXTENSION,
	},
	jwt: {
		refreshSecretKey: parsed.REFRESH_SECRET_KEY,
		accessSecretKey: parsed.ACCESS_SECRET_KEY,
		refreshTokenExpiration: parsed.REFRESH_TOKEN_EXPIRATION,
		accessTokenExpiration: parsed.ACCESS_TOKEN_EXPIRATION,
	}
};