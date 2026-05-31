import { Router } from "express";

export const authRoutes = Router();
import authController from "./controller/auth.controller";

authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post('/login', authController.login.bind(authController))