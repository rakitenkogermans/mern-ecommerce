import { Request, Response } from "express";
import { Order } from "../models/Order";
import { StatusCodes } from "../constants/statusCodes";

const getAllOrders = async (req: Request, res: Response) => {
  const products = await Order.find({});
  res.json(products);
};

const addOrderItems = async (
  req: Request<
    {},
    {},
    {
      orderItems: {
        product: string;
        name: string;
        image: string;
        price: number;
        countInStock: number;
        qty: number;
      }[];
      shippingAddress: string;
      paymentMethod: string;
      itemsPrice: string;
      taxPrice: string;
      shippingPrice: string;
      totalPrice: string;
    }
  >,
  res: Response
) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("No order items!");
  }

  const order = new Order({
    orderItems,
    user: res.locals.userId,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(StatusCodes.CREATED).json(createdOrder);
};

export { getAllOrders, addOrderItems };
