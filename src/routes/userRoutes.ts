import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUserProfile, userAuth } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/login").post(asyncHandler(userAuth));
userRouter
  .route("/profile")
  .get(asyncHandler(protect), asyncHandler(getUserProfile));

export { userRouter };
