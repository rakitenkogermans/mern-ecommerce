import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';
import * as UserActionCreators from './userActions';
import * as OrderActionCreators from './orderActions';
import * as UserListActionCreators from './userListActions';
import * as UserDeleteActionCreators from './userDeleteActions';

export const ActionCreators = {
    ...ProductActionCreators,
    ...CartActionCreators,
    ...UserActionCreators,
    ...UserListActionCreators,
    ...UserDeleteActionCreators,
    ...OrderActionCreators,
};
