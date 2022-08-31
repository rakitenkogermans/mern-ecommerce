import { Dispatch } from 'redux';
import { CartAction, CartActionTypes } from '../../@types/cart/cart';
import axios from 'axios';
import { ProductType } from '../../@types/products';
import { RootState } from '../reducers';
import { saveToLocalstorage } from '../../utils/localstorage';
import { LocalstorageKeys } from '../../@types/localstorage';

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

export { addToCart, removeFromCart };
