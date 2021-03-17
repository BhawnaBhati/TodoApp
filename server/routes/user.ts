import express from "express";
const router = express.Router();

import { createUser, login, logout } from "../services/userModel";
import { dashboard } from "../services/tasksModel";

router.post("/adduser", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("create user...");
    res.send(await createUser({ username, password }));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login({ username, password });
    console.log(token);
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { username } = req.body;
    res.send(await logout(username));
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard", async (req, res, next) => {
  const userId = req.userId as number;
  try {
    res.send(await dashboard(+userId));
  } catch (err) {
    next(err);
  }
});

export default router;
