require("dotenv").config();
import BPromise from "bluebird";
const pgp = require("pg-promise")({ promiseLib: BPromise });

const connectionOptions = {
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  database: `${process.env.DB_NAME}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
};

test("should connect to DB", async () => {
  console.log(
    `Connecting to DB at ${process.env.DB_HOST}:${process.env.DB_PORT}`
  );
  const db = pgp(connectionOptions);
  expect(db).toHaveProperty("connect");
});
