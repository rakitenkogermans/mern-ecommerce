type OrderDeliverState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum OrderDeliverActionTypes {
    ORDER_DELIVER_BEGIN = 'ORDER_DELIVER_BEGIN',
    ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS',
    ORDER_DELIVER_ERROR = 'ORDER_DELIVER_ERROR',
    ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET',
}

type OrderDeliverAction =
    | { type: OrderDeliverActionTypes.ORDER_DELIVER_BEGIN }
    | { type: OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS }
    | { type: OrderDeliverActionTypes.ORDER_DELIVER_ERROR; payload: { msg: string } }
    | { type: OrderDeliverActionTypes.ORDER_DELIVER_RESET };

export { OrderDeliverState, OrderDeliverActionTypes, OrderDeliverAction };
