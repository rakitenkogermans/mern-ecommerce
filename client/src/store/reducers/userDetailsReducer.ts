import {
    UserDetailsAction,
    UserDetailsActionTypes,
    UserDetailsState,
} from '../../types/user/userDetails';

const userDetailsInitialState: UserDetailsState = {
    isLoading: false,
    user: null,
    error: null,
};

const userDetailsReducer = (
    state = userDetailsInitialState,
    action: UserDetailsAction
): UserDetailsState => {
    if (action.type === UserDetailsActionTypes.USER_DETAILS_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === UserDetailsActionTypes.USER_DETAILS_SUCCESS) {
        return { ...state, isLoading: false, user: action.payload.user, error: null };
    }

    if (action.type === UserDetailsActionTypes.USER_DETAILS_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === UserDetailsActionTypes.USER_DETAILS_RESET) {
        return userDetailsInitialState;
    }

    return state;
};

export { userDetailsReducer };
