type UserDeleteState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum UserDeleteActionTypes {
    USER_DELETE_BEGIN = 'USER_DELETE_BEGIN',
    USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS',
    USER_DELETE_ERROR = 'USER_DELETE_ERROR',
}

type UserDeleteAction =
    | { type: UserDeleteActionTypes.USER_DELETE_BEGIN }
    | { type: UserDeleteActionTypes.USER_DELETE_SUCCESS }
    | { type: UserDeleteActionTypes.USER_DELETE_ERROR; payload: { msg: string } };

export { UserDeleteActionTypes, UserDeleteAction, UserDeleteState };
