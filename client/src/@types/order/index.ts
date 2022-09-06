type OrderItems = {
    _id: string;
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
};

type ShippingAddres = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

type PaymentResult = {
    _id: string;
    id: string;
    status: string;
    updateTime: string;
    emailAddress: string;
};

type BaseOrder = {
    _id: string;
    orderItems: OrderItems[];
    shippingAddress: ShippingAddres;
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type Order = BaseOrder & {
    user: string;
};

type OrderDetails = BaseOrder & {
    user: { _id: string; name: string; email: string };
    deliveredAt: Date;
    paidAt: Date;
};

export { Order, OrderDetails, PaymentResult };
