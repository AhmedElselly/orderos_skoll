import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { env } from './common/config/env';

export const startServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());

	app.use("/api", routes);

	return app
}
