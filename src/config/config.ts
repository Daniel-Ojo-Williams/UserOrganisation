import path from 'path';
import { ENV, ENVCONFIG } from '../types';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(`${__dirname}/../../.env`) });

const getConfig = (): ENV => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
    DB_STRING: process.env.DB_STRING,
    ENVIRONMENT: process.env.ENVIRONMENT
  };
};

export const sanitizeConfig = (config: ENV): ENVCONFIG => {
  for (const [key, value] of Object.entries(config)) {
    if (!value || value === 'undefined') throw new Error(`${key} is missing in env file`);
  }

  return config as ENVCONFIG;
};

export const config = sanitizeConfig(getConfig());
