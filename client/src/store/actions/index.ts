import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';
import * as UserActionCreators from './userActions';
import * as OrderActionCreators from './orderActions';
import * as UserListActionCreators from './userListActions';
import * as UserDeleteActionCreators from './userDeleteActions';
import * as UserDetailsActionCreators from './userDetailsActions';
import * as UserDetailsUpdateActionCreators from './userDetailsUpdateActions';
import * as ProductDeleteActionCreators from './productDeleteAction';
import * as ProductCreateActionCreators from './productCreateActions';
import * as ProductUpdateActionCreators from './productUpdateActions';
import * as ProductCreateReviewActionCreators from './productReviewActions';

export const ActionCreators = {
    ...ProductActionCreators,
    ...CartActionCreators,
    ...UserActionCreators,
    ...UserListActionCreators,
    ...UserDeleteActionCreators,
    ...UserDetailsActionCreators,
    ...UserDetailsUpdateActionCreators,
    ...OrderActionCreators,
    ...ProductDeleteActionCreators,
    ...ProductCreateActionCreators,
    ...ProductUpdateActionCreators,
    ...ProductCreateReviewActionCreators,
};
