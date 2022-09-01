import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';
import * as UserActionCreators from './userActions';

export const ActionCreators = {
    ...ProductActionCreators,
    ...CartActionCreators,
    ...UserActionCreators,
};
