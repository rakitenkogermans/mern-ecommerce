import { OrderDetails } from './index';

type OrderDetailsState = {
    isLoading: boolean;
    order: OrderDetails | null;
    error: null | string;
};

enum OrderDetailsActionTypes {
    ORDER_DETAILS_BEGIN = 'ORDER_DETAILS_BEGIN',
    ORDER_DETAILS_SUCCES = 'ORDER_DETAILS_SUCCES',
    ORDER_DETAILS_ERROR = 'ORDER_DETAILS_ERROR',
}

type OrderDetailsAction =
    | { type: OrderDetailsActionTypes.ORDER_DETAILS_BEGIN }
    | { type: OrderDetailsActionTypes.ORDER_DETAILS_SUCCES; payload: { order: OrderDetails } }
    | { type: OrderDetailsActionTypes.ORDER_DETAILS_ERROR; payload: { msg: string } };

export { OrderDetailsState, OrderDetailsActionTypes, OrderDetailsAction };
