import { UserListType } from './index';

type UserListState = {
    isLoading: boolean;
    users: UserListType[];
    error: null | string;
};

enum UserListActionTypes {
    USER_LIST_BEGIN = 'USER_LIST_BEGIN',
    USER_LIST_SUCCESS = 'USER_LIST_SUCCESS',
    USER_LIST_ERROR = 'USER_LIST_ERROR',
}

type UsersListAction =
    | { type: UserListActionTypes.USER_LIST_BEGIN }
    | { type: UserListActionTypes.USER_LIST_SUCCESS; payload: { users: UserListType[] } }
    | { type: UserListActionTypes.USER_LIST_ERROR; payload: { msg: string } };

export { UserListActionTypes, UsersListAction, UserListState };
