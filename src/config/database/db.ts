import knex from "knex";
import KNEXCONFIG from "./knexfile";
import { config } from "../config";

export const db = knex(KNEXCONFIG[config.ENVIRONMENT]);
