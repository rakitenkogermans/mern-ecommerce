import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { StatusCodes } from "../constants/statusCodes";
import { User } from "../models/User";

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
    res.locals.userName = payload.userName;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Authentication Invalid");
  }
};

const admin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(res.locals.userId);

  if (user && user.isAdmin) {
    next();
    return;
  }

  res.status(StatusCodes.UNAUTHORIZED);
  throw new Error("Authentication Invalid");
};

export { protect, admin };
