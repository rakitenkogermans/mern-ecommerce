import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  removeProduct,
} from "../controllers/productsController";
import { asyncHandler } from "../utils/asyncHandler";
import { admin, protect } from "../middlewares/authMiddleware";

const productsRouter = Router();

productsRouter.route("/").get(asyncHandler(getAllProducts));

productsRouter
  .route("/:id")
  .get(asyncHandler(getProduct))
  .delete(
    asyncHandler(protect),
    asyncHandler(admin),
    asyncHandler(removeProduct)
  );

export { productsRouter };
