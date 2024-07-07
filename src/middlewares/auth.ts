import type { Request, Response, NextFunction } from 'express-serve-static-core';
import { HttpCode, decodeToken } from '../utils';
import { User } from '../types';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const authMid = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split('Bearer ')[1].trim() as string;

    if (!token) return res.status(HttpCode.UNAUTHORISED).json({ status: 'Authentication failed', message: 'Authentication failed, please login again' });

    const user = decodeToken<User>(token);
    req.user = user;
    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) return res.status(HttpCode.UNAUTHORISED).json({ message: 'Authentication failed: Token Expired', status: 'Token expired', statusCode: HttpCode.UNAUTHORISED });

    if (error instanceof JsonWebTokenError) return res.status(HttpCode.UNAUTHORISED).json({ message: 'Authentication failed', status: error.message, statusCode: HttpCode.UNAUTHORISED });

    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Something went wrong', serverMessage: error.message });
  }
}