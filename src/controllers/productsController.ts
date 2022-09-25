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

const removeProduct = async (req: Request<{ id: string }>, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }
  await product.remove();
  res.json({ message: "Product removed" });
};

const createProduct = async (req: Request, res: Response) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: res.locals.userId,
    image: "/assets/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(StatusCodes.OK).json(createdProduct);
};

const updateProduct = async (
  req: Request<
    { id: string },
    {},
    {
      name: string;
      image: string;
      brand: string;
      category: string;
      description: string;
      price: string;
      countInStock: string;
    }
  >,
  res: Response
) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }

  product.name = name || product.name;
  product.price = Number(price) || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = Number(countInStock) || product.countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

export {
  getProduct,
  getAllProducts,
  removeProduct,
  createProduct,
  updateProduct,
};
