import { Router } from "express";
import { healthRouter } from "./app/health/health.routes";
import { authRoutes } from "./app/auth/routes";

const routes = Router();

routes.use("/health", healthRouter);
routes.use("/auth", authRoutes);

export default routes;