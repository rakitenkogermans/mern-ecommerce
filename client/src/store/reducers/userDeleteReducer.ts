import {
    UserDeleteAction,
    UserDeleteActionTypes,
    UserDeleteState,
} from '../../types/user/userDelete';

const userDeleteInitialState: UserDeleteState = {
    isLoading: false,
    success: false,
    error: null,
};

const userDeleteReducer = (
    state = userDeleteInitialState,
    action: UserDeleteAction
): UserDeleteState => {
    if (action.type === UserDeleteActionTypes.USER_DELETE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserDeleteActionTypes.USER_DELETE_SUCCESS) {
        return { ...state, isLoading: false, success: true, error: null };
    }

    if (action.type === UserDeleteActionTypes.USER_DELETE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    return state;
};

export { userDeleteReducer };
