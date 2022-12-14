import { Dispatch } from 'redux';
import { CartAction, CartActionTypes } from '../../types/cart/cart';
import axios from 'axios';
import { ProductType } from '../../types/products';
import { RootState } from '../reducers';
import { saveToLocalstorage } from '../../utils/localstorage';
import { LocalstorageKeys } from '../../types/localstorage';
import { ShippingType } from '../../types/cart';

const addToCart =
    (id: string, qty: number) =>
    async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
        const { data } = await axios.get<ProductType>(`/api/products/${id}`);

        dispatch({
            type: CartActionTypes.CART_ADD_ITEM,
            payload: {
                item: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty,
                },
            },
        });

        saveToLocalstorage(LocalstorageKeys.CART_ITEMS, getState().cart.cartItems);
    };

const removeFromCart =
    (id: string) => async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
        dispatch({ type: CartActionTypes.CART_REMOVE_ITEM, payload: { id } });
        saveToLocalstorage(LocalstorageKeys.CART_ITEMS, getState().cart.cartItems);
    };

const saveShippingAddress = (data: ShippingType) => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS, payload: { data } });
    saveToLocalstorage(LocalstorageKeys.SHIPPING_ADDRESS, data);
};

const savePaymentMethod = (paymentMethod: string) => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.CART_SAVE_PAYMENT_METHOD, payload: { paymentMethod } });
    saveToLocalstorage(LocalstorageKeys.PAYMENT_METHOD, paymentMethod);
};

const cartReset = () => async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.CART_RESET });
};

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, cartReset };
