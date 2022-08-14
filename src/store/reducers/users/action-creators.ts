import axios from 'axios';
import { AppDispatch } from '../..';
import { IUser } from '../../../interfaces/User.interface';
import { UsersActionsEnum, SetUsersAction, SetIsLoadingAction, SetErrorAction } from './types';
import { FetchUser } from '../../../api/api';
import { IUserSearchResponse } from '../../../interfaces/UserSearchResponse';

export const UsersActionCreators = {
	setUsers: (users: IUser[]): SetUsersAction => ({type: UsersActionsEnum.SET_USERS, payload: users}),
	setIsLoading: (loading: boolean):  SetIsLoadingAction => ({type: UsersActionsEnum.SET_IS_LOADING, payload: loading}),
	setError: (error: string): SetErrorAction => ({type: UsersActionsEnum.SET_ERROR, payload: error}),
	fetchUsers: (query = 'repos:%3E1') => {
		return async (dispatch: AppDispatch): Promise<void> => {
			try {
				dispatch(UsersActionCreators.setIsLoading(true));
				const response = await axios.get<IUserSearchResponse>(`https://api.github.com/search/users?q=${query}&per_page=10`);
				if (response.status === 200) {
					const promises = response.data.items.map(async (user) => {
						const result = await FetchUser(user.login);
						if(result) {
							user.repo_count = result.public_repos || 0;
						} else {
							dispatch(UsersActionCreators.setError('Not found'));
						}
						return user;
					});
					const result = await Promise.all(promises);
					dispatch(UsersActionCreators.setUsers(result));
				}
				dispatch(UsersActionCreators.setIsLoading(false));
				dispatch(UsersActionCreators.setError(''));
			} catch (e) {
				if(e instanceof Error)
					dispatch(UsersActionCreators.setError(e.message));
			}
		};
	}
};