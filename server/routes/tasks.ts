import express from "express";
const router = express.Router();

import _ from "lodash";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksModel";

router.get("/", async (req, res, next) => {
  // Extract filter criteria from queryString
  const name = req.query.name as string;
  const userId = req.userId as number;
  try {
    const completed =
      req.query.completed === undefined
        ? undefined
        : req.query.completed === "true";
    res.send(await getTasks({ name, completed, user_id: +userId }));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const userId = req.userId as number;
  try {
    const { name, completed = false } = req.body;
    res.send(await createTask({ name, completed, user_id: +userId }));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id: number = +req.params.id;
    const { name, completed } = req.body;
    res.send(await updateTask({ id, name, completed }));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id: number = +req.params.id;
    res.send(await deleteTask(id));
  } catch (err) {
    next(err);
  }
});

export default router;
