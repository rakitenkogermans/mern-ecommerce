import { CartType, ShippingType } from './index';

type CartState = { cartItems: CartType[]; shippingAddres: ShippingType | null };

enum CartActionTypes {
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
    CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS',
}

type CartAction =
    | { type: CartActionTypes.CART_ADD_ITEM; payload: { item: CartType } }
    | { type: CartActionTypes.CART_REMOVE_ITEM; payload: { id: string } }
    | { type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS; payload: { data: ShippingType } };

export { CartActionTypes, CartAction, CartState };
