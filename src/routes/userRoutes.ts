import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/").post(asyncHandler(registerUser));
userRouter.route("/login").post(asyncHandler(authUser));
userRouter
  .route("/profile")
  .get(asyncHandler(protect), asyncHandler(getUserProfile))
  .put(asyncHandler(protect), asyncHandler(updateUserProfile));

export { userRouter };
