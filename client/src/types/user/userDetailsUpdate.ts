type UserDetailsUpdateState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum UserDetailsUpdateActionTypes {
    USER_DETAILS_UPDATE_BEGIN = 'USER_DETAILS_UPDATE_BEGIN',
    USER_DETAILS_UPDATE_SUCCESS = 'USER_DETAILS_UPDATE_SUCCESS',
    USER_DETAILS_UPDATE_ERROR = 'USER_DETAILS_UPDATE_ERROR',
    USER_DETAILS_UPDATE_RESET = 'USER_DETAILS_UPDATE_RESET',
}

type UserDetailsUpdateAction =
    | { type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_BEGIN }
    | { type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_SUCCESS }
    | { type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_ERROR; payload: { msg: string } }
    | { type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_RESET };

export { UserDetailsUpdateActionTypes, UserDetailsUpdateAction, UserDetailsUpdateState };
