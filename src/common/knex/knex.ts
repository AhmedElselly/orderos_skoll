import knex from "knex";
import knexConfig from "./knexConfig.js";

export const db = knex(knexConfig);

export const ping = async () => {
	try {
		await db.raw("SELECT 1");
		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection failed:", error);
	}
};