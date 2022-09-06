import { Request, Response } from "express";
import { Product } from "../models/Product";
import { StatusCodes } from "../constants/statusCodes";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req: Request<{ id: string }>, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }
  res.json(product);
};

export { getProduct, getAllProducts };
