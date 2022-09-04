type OrderItems = {
    _id: string;
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
};

type ShippingAddres = {
    _id: string;
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

export type Order = {
    _id: string;
    user: string;
    orderItems: OrderItems[];
    shippingAddress: ShippingAddres;
    paymentMethod: string;
    paymentResult: PaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
};
