import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { StatusCodes } from "../constants/statusCodes";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload: any = verify(token, process.env.JWT_SECRET || "");
    res.locals.userId = payload.userId;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Authentication Invalid");
  }
};

export { protect };
