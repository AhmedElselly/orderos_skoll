import { Router } from "express";
import { ping } from "../../common/knex/knex";

export const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
	try {
		await ping();
		res.status(200).json({ message: "pong" });
	} catch (error) {
		res.status(500).json({ message: "Database connection failed", error });
	}
});
