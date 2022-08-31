import { CartAction, CartActionTypes, CartState } from '../../@types/cart/cart';
import { LocalstorageKeys } from '../../@types/localstorage';

const cartItemsFromStorage = localStorage.getItem(LocalstorageKeys.CART_ITEMS);

const cartInitialState: CartState = {
    cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
};

const cartReducer = (state = cartInitialState, action: CartAction): CartState => {
    if (action.type === CartActionTypes.CART_ADD_ITEM) {
        const { item } = action.payload;
        const existItem = state.cartItems.find((p) => p.product === item.product);

        if (!existItem) {
            return { ...state, cartItems: [...state.cartItems, item] };
        }

        return {
            ...state,
            cartItems: state.cartItems.map((p) => (p.product === existItem.product ? item : p)),
        };
    }

    if (action.type === CartActionTypes.CART_REMOVE_ITEM) {
        return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.product !== action.payload.id),
        };
    }

    return state;
};

export { cartReducer };
