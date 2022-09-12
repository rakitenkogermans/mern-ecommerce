import { OrderDetails } from './index';

type OrderListClientState = {
    isLoading: boolean;
    orders: OrderDetails[];
    error: null | string;
};

enum OrderListClientActionTypes {
    ORDER_LIST_CLIENT_BEGIN = 'ORDER_LIST_CLIENT_BEGIN',
    ORDER_LIST_CLIENT_SUCCESS = 'ORDER_LIST_CLIENT_SUCCESS',
    ORDER_LIST_CLIENT_ERROR = 'ORDER_LIST_CLIENT_ERROR',
}

type OrderListClientAction =
    | { type: OrderListClientActionTypes.ORDER_LIST_CLIENT_BEGIN }
    | {
          type: OrderListClientActionTypes.ORDER_LIST_CLIENT_SUCCESS;
          payload: { orders: OrderDetails[] };
      }
    | { type: OrderListClientActionTypes.ORDER_LIST_CLIENT_ERROR; payload: { msg: string } };

export { OrderListClientState, OrderListClientActionTypes, OrderListClientAction };
