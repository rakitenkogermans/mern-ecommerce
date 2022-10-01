import { CartAction, CartActionTypes, CartState } from '../../types/cart/cart';
import { LocalstorageKeys } from '../../types/localstorage';
import { getFromLocalstorage } from '../../utils/localstorage';

const cartItemsFromStorage = getFromLocalstorage(LocalstorageKeys.CART_ITEMS);
const shippingAddresFromStorage = getFromLocalstorage(LocalstorageKeys.SHIPPING_ADDRESS);
const paymentMethodFromStorage = getFromLocalstorage(LocalstorageKeys.PAYMENT_METHOD);

const cartInitialState: CartState = {
    cartItems: cartItemsFromStorage ? cartItemsFromStorage : [],
    shippingAddress: shippingAddresFromStorage ? shippingAddresFromStorage : null,
    paymentMethod: paymentMethodFromStorage ? paymentMethodFromStorage : '',
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

    if (action.type === CartActionTypes.CART_SAVE_SHIPPING_ADDRESS) {
        return {
            ...state,
            shippingAddress: action.payload.data,
        };
    }

    if (action.type === CartActionTypes.CART_SAVE_PAYMENT_METHOD) {
        return { ...state, paymentMethod: action.payload.paymentMethod };
    }

    if (action.type === CartActionTypes.CART_RESET) {
        return { ...state, cartItems: [] };
    }

    return state;
};

export { cartReducer };
