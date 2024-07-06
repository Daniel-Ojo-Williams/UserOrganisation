import jwt from 'jsonwebtoken';
import { config } from '../config';

type ExpDuration = 'd' | 'h' | 's';
type Expiry = `${number}${ExpDuration}`;

export const genToken = <T extends Record<string, string>>(payload: T, expiry: Expiry = `1h`, secret?: string) => {
  if (!secret) secret = config.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: expiry });

  return token
};

export const decodeToken = <T>(token: string, secret?: string): T => {
  if (!secret) secret = config.JWT_SECRET;
  const decoded = jwt.verify(token, secret);

  return decoded as T;
}
