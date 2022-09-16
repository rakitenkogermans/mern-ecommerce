import { UserListActionTypes, UserListState, UsersListAction } from '../../types/user/userList';

const userListInitialState: UserListState = {
    isLoading: false,
    users: [],
    error: null,
};

const userListReducer = (state = userListInitialState, action: UsersListAction): UserListState => {
    if (action.type === UserListActionTypes.USER_LIST_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === UserListActionTypes.USER_LIST_SUCCESS) {
        return { ...state, isLoading: false, users: action.payload.users, error: null };
    }

    if (action.type === UserListActionTypes.USER_LIST_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === UserListActionTypes.USER_LIST_RESET) {
        return userListInitialState;
    }

    return state;
};

export { userListReducer };
