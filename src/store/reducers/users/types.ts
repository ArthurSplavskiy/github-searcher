import { AxiosError } from 'axios';
import { IUser } from '../../../interfaces/User.interface';

export interface UsersState {
	users: IUser[];
	isLoading: boolean;
	error: string;
}

export enum UsersActionsEnum {
	SET_USERS = 'SET_USERS',
	SET_IS_LOADING = 'SET_IS_LOADING',
	SET_ERROR = 'SET_ERROR'
}

export interface SetUsersAction {
	type: UsersActionsEnum.SET_USERS;
	payload: IUser[];
}

export interface SetIsLoadingAction {
	type: UsersActionsEnum.SET_IS_LOADING;
	payload: boolean;
}

export interface SetErrorAction {
	type: UsersActionsEnum.SET_ERROR;
	payload: string;
}

export type UsersAction = SetUsersAction | SetIsLoadingAction | SetErrorAction;