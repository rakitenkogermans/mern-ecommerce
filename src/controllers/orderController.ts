import { Request, Response } from "express";
import { Order } from "../models/Order";
import { StatusCodes } from "../constants/statusCodes";

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: res.locals.userId });
  res.json(orders);
};

const getOrderById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Order not found");
  }
  res.json(order);
};

const updateOrderToPaid = async (
  req: Request<
    { id: string },
    {},
    {
      id: string;
      status: string;
      update_time: string;
      payer: { email_address: string };
    }
  >,
  res: Response
) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Order not found");
  }
  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updateTime: req.body.update_time,
    emailAddress: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
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

export { getAllOrders, addOrderItems, getOrderById, updateOrderToPaid };
