declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENVCONFIG {}
  }
}

export interface ENV {
  JWT_SECRET?: string;
  DB_STRING?: string;
  ENVIRONMENT?: string;
}

export type ENVCONFIG = Required<ENV>;
