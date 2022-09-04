export type CartType = {
    product: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
};

export type ShippingType = { address: string; city: string; postalCode: string; country: string };
