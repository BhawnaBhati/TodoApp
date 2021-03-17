import { GeneralError } from "../utils/errors";
import { Request, Response, NextFunction } from "express";

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If error is one the defined types return specific error
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      message: err.message,
    });
  }

  // return 500 for all other errors
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};

export { handleErrors };
