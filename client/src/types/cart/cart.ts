import { CartType, ShippingType } from './index';

type CartState = {
    cartItems: CartType[];
    shippingAddress: ShippingType | null;
    paymentMethod: string;
};

enum CartActionTypes {
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
    CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS',
    CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD',
}

type CartAction =
    | { type: CartActionTypes.CART_ADD_ITEM; payload: { item: CartType } }
    | { type: CartActionTypes.CART_REMOVE_ITEM; payload: { id: string } }
    | { type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS; payload: { data: ShippingType } }
    | { type: CartActionTypes.CART_SAVE_PAYMENT_METHOD; payload: { paymentMethod: string } };

export { CartActionTypes, CartAction, CartState };
