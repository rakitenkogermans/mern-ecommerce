import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';
import { orderCreateReducer } from './orderCreateReducer';
import { orderDetailsReducer } from './orderDetailsReducer';
import { orderPayReducer } from './orderPayReducer';
import { orderListClientReducer } from './orderListClientReducer';
import { userListReducer } from './userListReducer';
import { userDeleteReducer } from './userDeleteReducer';
import { userDetailsReducer } from './userDetailsReducer';
import { userDetailsUpdateReducer } from './userDetailsUpdateReducer';
import { productDeleteReducer } from './productDeleteReducer';

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    user: userReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userDetailsUpdate: userDetailsUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListClient: orderListClientReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
