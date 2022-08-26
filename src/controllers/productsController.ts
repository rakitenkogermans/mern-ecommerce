import { Request, Response } from "express";
import { products } from "../data/products";

const getAllProducts = (req: Request, res: Response) => {
  res.json(products);
};

const getProduct = (req: Request, res: Response) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
};

export { getProduct, getAllProducts };
