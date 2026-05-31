import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../../common/config/env';
import { SystemRole } from '../user/enums';

export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export interface JwtPayload {
    userId: number;
    email: string;
    role: SystemRole;
}

export async function createAccessToken(payload: JwtPayload): Promise<string> {
    const options: SignOptions = {
        expiresIn: env.jwt.accessTokenExpiration,
    };
    const token = jwt.sign(payload, env.jwt.accessSecretKey, options);
    return token;
}

export async function createRefreshToken(payload: JwtPayload): Promise<string> {
    const options: SignOptions = {
        expiresIn: env.jwt.refreshTokenExpiration,
    };
    const token = jwt.sign(payload, env.jwt.refreshSecretKey, options);
    return token;
}
