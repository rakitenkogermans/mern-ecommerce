import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  removeProduct,
  updateProduct,
} from "../controllers/productsController";
import { asyncHandler } from "../utils/asyncHandler";
import { admin, protect } from "../middlewares/authMiddleware";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(asyncHandler(getAllProducts))
  .post(
    asyncHandler(protect),
    asyncHandler(admin),
    asyncHandler(createProduct)
  );

productsRouter
  .route("/:id")
  .get(asyncHandler(getProduct))
  .delete(
    asyncHandler(protect),
    asyncHandler(admin),
    asyncHandler(removeProduct)
  )
  .put(asyncHandler(protect), asyncHandler(admin), asyncHandler(updateProduct));

export { productsRouter };
