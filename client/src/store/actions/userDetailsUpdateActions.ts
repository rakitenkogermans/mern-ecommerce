import { UserListType } from '../../types/user';
import {
    UserDetailsUpdateAction,
    UserDetailsUpdateActionTypes,
} from '../../types/user/userDetailsUpdate';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';

const updateUserDetails =
    (userDetails: UserListType) =>
    async (dispatch: Dispatch<UserDetailsUpdateAction>, getState: () => RootState) => {
        dispatch({ type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            await axios.put<UserListType>(`/api/users/${userDetails._id}`, userDetails, config);
            dispatch({
                type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_SUCCESS,
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const updateUserDetailsReset = () => async (dispatch: Dispatch<UserDetailsUpdateAction>) => {
    dispatch({ type: UserDetailsUpdateActionTypes.USER_DETAILS_UPDATE_RESET });
};
export { updateUserDetails, updateUserDetailsReset };
