import express, { Request, Response } from "express";
import { products } from "../data/products";

const productsRouter = express.Router();

productsRouter.route("/").get((req: Request, res: Response) => {
  res.json(products);
});

// place before :id
productsRouter.route("/:id").get((req: Request, res: Response) => {
  console.log("param id", req.params.id);
  const product = products.find((p) => p._id === req.params.id);
  console.log(product);
  res.json(product);
});

export { productsRouter };
