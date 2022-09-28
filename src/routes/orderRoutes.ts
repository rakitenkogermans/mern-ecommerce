import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  addOrderItems,
  getAllClientOrders,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController";
import { admin, protect } from "../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter
  .route("/")
  .post(asyncHandler(protect), asyncHandler(addOrderItems))
  .get(asyncHandler(protect), asyncHandler(admin), asyncHandler(getAllOrders));

orderRouter
  .route("/allorders")
  .get(asyncHandler(protect), asyncHandler(getAllClientOrders));

orderRouter
  .route("/:id")
  .get(asyncHandler(protect), asyncHandler(getOrderById));

orderRouter
  .route("/:id/pay")
  .put(asyncHandler(protect), asyncHandler(updateOrderToPaid));

export { orderRouter };
