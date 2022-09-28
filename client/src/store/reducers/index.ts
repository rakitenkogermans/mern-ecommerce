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
import { productCreateReducer } from './productCreateReducer';
import { productUpdateReducer } from './productUpdateReducer';
import { orderListReducer } from './orderListReducer';

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
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
    orderList: orderListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
