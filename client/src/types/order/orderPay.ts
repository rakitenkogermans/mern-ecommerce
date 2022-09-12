type OrderPayState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum OrderPayActionTypes {
    ORDER_PAY_BEGIN = 'ORDER_PAY_BEGIN',
    ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS',
    ORDER_PAY_ERROR = 'ORDER_PAY_ERROR',
    ORDER_PAY_RESET = 'ORDER_PAY_RESET',
}

type OrderPayAction =
    | { type: OrderPayActionTypes.ORDER_PAY_BEGIN }
    | { type: OrderPayActionTypes.ORDER_PAY_SUCCESS }
    | { type: OrderPayActionTypes.ORDER_PAY_ERROR; payload: { msg: string } }
    | { type: OrderPayActionTypes.ORDER_PAY_RESET };

export { OrderPayState, OrderPayActionTypes, OrderPayAction };
