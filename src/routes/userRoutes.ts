import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  removeUser,
  updateUserProfile,
} from "../controllers/userController";
import { admin, protect } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter
  .route("/")
  .get(asyncHandler(protect), asyncHandler(admin), asyncHandler(getUsers))
  .post(asyncHandler(registerUser));

userRouter.route("/login").post(asyncHandler(authUser));

userRouter
  .route("/profile")
  .get(asyncHandler(protect), asyncHandler(getUserProfile))
  .put(asyncHandler(protect), asyncHandler(updateUserProfile));

userRouter
  .route("/:id")
  .delete(asyncHandler(protect), asyncHandler(admin), asyncHandler(removeUser));

export { userRouter };
