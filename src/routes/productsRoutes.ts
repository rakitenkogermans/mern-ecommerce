import express from "express";
import { getAllProducts, getProduct } from "../controllers/productsController";
import { asyncHandler } from "../middlewares/asyncHandler";

const productsRouter = express.Router();

productsRouter.route("/").get(asyncHandler(getAllProducts));

productsRouter.route("/:id").get(asyncHandler(getProduct));

export { productsRouter };
