declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENVCONFIG {}
  }

  namespace Express {
    export interface Request {
      user: User; 
    }
  }
}

export type User = { userId: string, email: string }

export interface ENV {
  JWT_SECRET?: string;
  DATABASE_URL?: string;
  ENVIRONMENT?: string;
  PORT?: string;
}

export type ENVCONFIG = Required<ENV>;
