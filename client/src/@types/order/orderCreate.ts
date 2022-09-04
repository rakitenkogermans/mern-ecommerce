import { Order } from './index';

type OrderCreateState = {
    isLoading: boolean;
    success: boolean;
    order: Order | null;
    error: null | string;
};

enum OrderCreateActionTypes {
    ORDER_CREATE_BEGIN = 'ORDER_CREATE_BEGIN',
    ORDER_CREATE_SUCCES = 'ORDER_CREATE_SUCCES',
    ORDER_CREATE_ERROR = 'ORDER_CREATE_ERROR',
}

type OrderCreateAction =
    | { type: OrderCreateActionTypes.ORDER_CREATE_BEGIN }
    | { type: OrderCreateActionTypes.ORDER_CREATE_SUCCES; payload: { order: Order } }
    | { type: OrderCreateActionTypes.ORDER_CREATE_ERROR; payload: { msg: string } };

export { OrderCreateState, OrderCreateActionTypes, OrderCreateAction };
