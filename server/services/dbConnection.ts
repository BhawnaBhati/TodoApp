import BPromise from "bluebird";
const pgp = require("pg-promise")({ promiseLib: BPromise });

const connectionOptions = {
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  database: `${process.env.DB_NAME}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
};

export const DB = pgp(connectionOptions);
