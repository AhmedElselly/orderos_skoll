import http from "http";
import { startServer } from "./app";
import { env } from "./common/config/env";

const app = startServer();

const server: http.Server = http.createServer(app);

server.listen(env.port, () => {
	console.log(`Server is running on portport ${env.port}`);
});

async function shutdown() {
	console.log("Shutting down server...");
	server.close(() => {
		console.log("Server closed.");
		process.exit(0);
	});
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);