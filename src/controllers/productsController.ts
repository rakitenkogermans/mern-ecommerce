import { Request, Response } from "express";
import { products } from "../data/products";

const getAllProducts = (req: Request, res: Response) => {
  res.json(products);
};

const getProduct = (req: Request, res: Response) => {
  console.log("param id", req.params.id);
  const product = products.find((p) => p._id === req.params.id);
  console.log(product);
  res.json(product);
};

export { getProduct, getAllProducts };
