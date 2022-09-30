import { Document, Types } from 'mongoose';

interface OrderItems {
    _id: Types.ObjectId;
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: Types.ObjectId;
}

interface ShippingAddres {
    _id: Types.ObjectId;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface PaymentResult {
    // _id: Types.ObjectId;
    id: string;
    status: string;
    updateTime: string;
    emailAddress: string;
}

export interface IOrder {
    user: Types.ObjectId;
    orderItems: Types.DocumentArray<OrderItems>;
    shippingAddress: Types.DocumentArray<ShippingAddres>;
    paymentMethod: string;
    paymentResult: PaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
}

export interface IOrderModel extends IOrder, Document {}
