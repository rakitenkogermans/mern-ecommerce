import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';
import { Order } from '../../@types/order';
import { OrderCreateAction, OrderCreateActionTypes } from '../../@types/order/orderCreate';
import { CartType, ShippingType } from '../../@types/cart';

const createOrder =
    (order: {
        orderItems: CartType[];
        shippingAddress: ShippingType | null;
        paymentMethod: string;
        itemsPrice: number;
        taxPrice: number;
        shippingPrice: number;
        totalPrice: number;
    }) =>
    async (dispatch: Dispatch<OrderCreateAction>, getState: () => RootState) => {
        dispatch({ type: OrderCreateActionTypes.ORDER_CREATE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo!.token}`,
                },
            };

            const { data } = await axios.post<Order>('/api/orders', order, config);
            dispatch({
                type: OrderCreateActionTypes.ORDER_CREATE_SUCCES,
                payload: { order: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderCreateActionTypes.ORDER_CREATE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

export { createOrder };
