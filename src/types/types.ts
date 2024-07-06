declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENVCONFIG {}
  }
}

export interface ENV {
  JWT_SECRET?: string;
}

export type ENVCONFIG = Required<ENV>;
