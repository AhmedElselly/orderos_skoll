import { Router } from "express";
import { healthRouter } from "./app/health/health.routes";

const routes = Router();

routes.use("/health", healthRouter);

export default routes;