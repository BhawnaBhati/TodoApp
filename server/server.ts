require("dotenv").config();
import express from "express";
let cors = require("cors");

import taskRouter from "./routes/tasks";
import userRouter from "./routes/user";
import { handleErrors } from "./services/handleErrors";
import { validateToken } from "./utils/validateToken";

// Create a new express app instance
const app: express.Application = express();
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth Middleware
// apply for all paths except /login
app.use((req, res, next) => {
  if (req.path === "/login") return next();
  if (req.path === "/adduser") return next();

  validateToken(req, res, next);
  next();
});

// Task Routes
app.use("/tasks", taskRouter);
app.use("/", userRouter);

// Error Handling
app.use(handleErrors);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});

module.exports = app;
