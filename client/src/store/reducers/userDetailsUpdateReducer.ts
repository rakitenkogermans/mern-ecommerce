import {
    UserDetailsUpdateAction,
    UserDetailsUpdateActionTypes,
    UserDetailsUpdateState,
} from '../../types/user/userDetailsUpdate';

const userDetailsUpdateInitialState: UserDetailsUpdateState = {
    isLoading: false,
    success: false,
    error: null,
};

const userDetailsUpdateReducer = (
    state = userDetailsUpdateInitialState,
    action: UserDetailsUpdateAction
): UserDetailsUpdateState => {
    if (action.type === UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_SUCCESS) {
        return { ...state, isLoading: false, success: true, error: null };
    }

    if (action.type === UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_RESET) {
        return userDetailsUpdateInitialState;
    }

    return state;
};

export { userDetailsUpdateReducer };
