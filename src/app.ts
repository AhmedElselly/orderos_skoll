import express from 'express';
import cors from 'cors';
import routes from './routes';

export const startServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());

	app.use("/api", routes);

	app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log(err);
		res.status(500).json({ error: err.message });
	});

	return app
}
