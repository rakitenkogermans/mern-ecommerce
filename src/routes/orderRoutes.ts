import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { addOrderItems, getAllOrders } from "../controllers/orderController";
import { protect } from "../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(asyncHandler(getAllOrders))
  .post(asyncHandler(protect), asyncHandler(addOrderItems));

export { orderRouter };
