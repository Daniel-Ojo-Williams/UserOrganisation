import { ENV, ENVCONFIG } from '../types';
import 'dotenv/config';

const getConfig = (): ENV => {
  return {
    JWT_SECRET: process.env.JWT_SECRET
  };
};

export const sanitizeConfig = (config: ENV): ENVCONFIG => {
  for (const [key, value] of Object.entries(config)) {
    if (!value || value === 'undefined') throw new Error(`${key} is missing in env file`);
  }

  return config as ENVCONFIG;
};

export const config = sanitizeConfig(getConfig());
