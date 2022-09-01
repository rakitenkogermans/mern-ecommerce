import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { userAuth } from "../controllers/userController";

const userRouter = Router();

userRouter.route("/login").post(asyncHandler(userAuth));

export { userRouter };
