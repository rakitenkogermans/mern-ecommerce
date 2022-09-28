import { OrderDetails } from './index';

type OrderListState = {
    isLoading: boolean;
    orders: OrderDetails[];
    error: null | string;
};

enum OrderListActionTypes {
    ORDER_LIST_BEGIN = 'ORDER_LIST_BEGIN',
    ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS',
    ORDER_LIST_ERROR = 'ORDER_LIST_ERROR',
}

type OrderListAction =
    | { type: OrderListActionTypes.ORDER_LIST_BEGIN }
    | {
          type: OrderListActionTypes.ORDER_LIST_SUCCESS;
          payload: { orders: OrderDetails[] };
      }
    | { type: OrderListActionTypes.ORDER_LIST_ERROR; payload: { msg: string } };

export { OrderListState, OrderListActionTypes, OrderListAction };
