import { combineReducers, Reducer } from 'redux';
import { productListReducer } from './productListReducer';

export const rootReducer: Reducer = combineReducers({ productList: productListReducer });
