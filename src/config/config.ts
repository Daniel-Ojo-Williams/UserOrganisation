import path from 'path';
import { ENV, ENVCONFIG } from '../types';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(`${__dirname}/../../.env`) });

const getConfig = (): ENV => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.PORT
  };
};

export const sanitizeConfig = (config: ENV): ENVCONFIG => {
  for (const [key, value] of Object.entries(config)) {
    if (!value || value === 'undefined') throw new Error(`${key} is missing in env file`);
  }

  return config as ENVCONFIG;
};

export const config = sanitizeConfig(getConfig());
