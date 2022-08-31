import { CartAction, CartActionTypes, CartState } from '../../@types/cart/cart';

const cartItemsFromStorage = localStorage.getItem('cartItems');

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
    }

    return state;
};

export { cartReducer };
