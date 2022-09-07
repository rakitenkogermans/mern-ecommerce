import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController";
import { protect } from "../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(asyncHandler(getAllOrders))
  .post(asyncHandler(protect), asyncHandler(addOrderItems));

orderRouter
  .route("/:id")
  .get(asyncHandler(protect), asyncHandler(getOrderById));

orderRouter
  .route("/:id/pay")
  .put(asyncHandler(protect), asyncHandler(updateOrderToPaid));

export { orderRouter };
