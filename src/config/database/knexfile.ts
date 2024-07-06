import { Knex } from "knex";
import { config } from "../index";

const KNEXCONFIG: { [index: string]: Knex.Config } = {
  dev: {
    client: "sqlite3",
    connection: config.DB_STRING,
    pool: {
      min: 0,
      max: 5,
    },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/migrations`,
    }
  },
};

export default KNEXCONFIG;
