import express from "express";
import { getAllProducts, getProduct } from "../controllers/productsController";

const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts);

// place before :id
productsRouter.route("/:id").get(getProduct);

export { productsRouter };
