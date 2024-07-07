import crypto from 'crypto';

export const genId = () => crypto.randomBytes(16).toString('hex');
