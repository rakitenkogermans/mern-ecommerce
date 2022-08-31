import { CartType } from './index';

type CartState = { cartItems: CartType[] };

enum CartActionTypes {
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
}

type CartAction =
    | { type: CartActionTypes.CART_ADD_ITEM; payload: { item: CartType } }
    | { type: CartActionTypes.CART_REMOVE_ITEM; payload: { id: string } };

export { CartActionTypes, CartAction, CartState };
