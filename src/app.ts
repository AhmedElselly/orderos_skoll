import express from 'express';
import cors from 'cors';
import routes from './routes.ts';
import { env } from './common/config/env.ts';

export const startServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());

	app.use("/api", routes);

	return app
}
