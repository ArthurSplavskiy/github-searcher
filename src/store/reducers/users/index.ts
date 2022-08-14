import { UsersAction, UsersActionsEnum, UsersState } from './types';

const initialState: UsersState = {
	users: [],
	isLoading: false,
	error: ''
};

export default function userReducer (state = initialState, action: UsersAction): UsersState {
	switch (action.type) {
		case UsersActionsEnum.SET_USERS:
			return { ...state, users: action.payload };
		case UsersActionsEnum.SET_IS_LOADING:
			return { ...state, isLoading: action.payload };
		case UsersActionsEnum.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
}