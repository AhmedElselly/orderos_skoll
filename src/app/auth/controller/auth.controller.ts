import { NextFunction, Request, Response } from "express";
import authService, { AuthService } from "../service/auth.service";
import { validateBody } from "../../../common/validation/validate";
import { AuthDto } from "../dto/auth.dto";

export class AuthController {
	constructor(private readonly authService: AuthService) { }

	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await validateBody(AuthDto, req.body);
			const result = await this.authService.register(data);
			return res.status(201).json(result);
		} catch (error) {
			next(error)
		}
	}
}

const authController = new AuthController(authService);

export default authController