import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { UserListType } from '../../types/user';
import { RootState } from '../reducers';
import { UserDetailsAction, UserDetailsActionTypes } from '../../types/user/userDetails';

const getUserById =
    (id: string) => async (dispatch: Dispatch<UserDetailsAction>, getState: () => RootState) => {
        dispatch({ type: UserDetailsActionTypes.USER_DETAILS_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };
            const { data } = await axios.get<UserListType>(`/api/users/${id}`, config);
            dispatch({
                type: UserDetailsActionTypes.USER_DETAILS_SUCCESS,
                payload: { user: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserDetailsActionTypes.USER_DETAILS_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const userDetailsReset = () => async (dispatch: Dispatch<UserDetailsAction>) => {
    dispatch({ type: UserDetailsActionTypes.USER_DETAILS_RESET });
};

export { getUserById, userDetailsReset };
