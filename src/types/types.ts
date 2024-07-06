declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENVCONFIG {}
  }
}

export interface ENV {
  JWT_SECRET?: string;
  DATABASE_URL?: string;
  ENVIRONMENT?: string;
  PORT?: string;
}

export type ENVCONFIG = Required<ENV>;
