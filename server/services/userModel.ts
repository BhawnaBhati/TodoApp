import { DB } from "./dbConnection";
import { UserRecord } from "../utils/types";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

import {
  GeneralError,
  BadRequest,
  NotFound,
  BadAuthorization,
} from "../utils/errors";

const saltingRounds = 10;

const hashPassword = async (password: string) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltingRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

const getUserByUsername = async (username: string) => {
  const item = await DB.oneOrNone(
    `SELECT * FROM users where username=$(username)`,
    { username }
  );
  return item;
};

const updateUserLoginStatus = async (
  username: string,
  loginStatus: boolean
) => {
  return await DB.none(
    `UPDATE users set is_logged_in=$(loginStatus) where username=$(username)`,
    { username, loginStatus }
  );
};

const createUser = async (user: UserRecord) => {
  const { username = "", password = "" } = user;
  if (username === "" || password === "")
    throw new BadAuthorization(
      "Cannot create user. Either username or password is blank."
    );

  const item = await getUserByUsername(username);
  if (item !== null) {
    throw new BadRequest("User already exists.");
  }
  const hash = await hashPassword(password);
  await DB.none(
    `INSERT INTO users(
        username,password
    ) VALUES ( 
         $(username), $(hash)
    )`,
    { username, hash }
  );
};

const login = async (user: UserRecord) => {
  const { username, password } = user;
  const dbUser = await getUserByUsername(username);
  if (dbUser === null) {
    throw new NotFound("Not found.");
  }

  // Check if already logged in
  // if (dbUser.is_logged_in) {
  //   return;
  // }

  const match = await bcrypt.compare(password, dbUser.password);

  if (!match) {
    throw new BadAuthorization("Invalid user or password");
  }
  // create and return jwt
  const payload = { username: dbUser.username, userId: +dbUser.id };
  const options = { expiresIn: "2d", issuer: "TDCX TODO App" };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);

  // Record login status
  await updateUserLoginStatus(dbUser.username, true);
  return token;
};

const logout = async (username: string) => {
  const dbUser = await getUserByUsername(username);
  if (dbUser === null) {
    throw new NotFound("User not found.");
  }

  // Check if already logged in
  if (dbUser.is_logged_in) {
    return await updateUserLoginStatus(dbUser.username, false);
  }
  throw new BadRequest("User not logged in currently");
};

export { createUser, login, logout };
