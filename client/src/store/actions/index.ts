import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';
import * as UserActionCreators from './userActions';
import * as OrderActionCreators from './orderActions';

export const ActionCreators = {
    ...ProductActionCreators,
    ...CartActionCreators,
    ...UserActionCreators,
    ...OrderActionCreators,
};
