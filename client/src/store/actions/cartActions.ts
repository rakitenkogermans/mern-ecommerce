import { Dispatch } from 'redux';
import { CartAction, CartActionTypes } from '../../@types/cart/cart';
import axios from 'axios';
import { ProductType } from '../../@types/products';
import { RootState } from '../reducers';

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

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    };

export { addToCart };
