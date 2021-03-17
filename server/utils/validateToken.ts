const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { BadAuthorization } from "../utils/errors";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = authorizationHeaader.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: "2d",
      issuer: "TDCX TODO App",
    };
    try {
      // verify token
      result = jwt.verify(token, process.env.JWT_SECRET, options);
      console.log(result);
      req.username = result.username;
      req.userId = +result.userId;
    } catch (err) {
      throw new BadAuthorization(
        "Authorization information is missing or invalid"
      );
    }
  } else {
    throw new BadAuthorization(
      "Authorization information is missing or invalid"
    );
  }
};

export { validateToken };
