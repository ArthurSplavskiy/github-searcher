import axios from 'axios';
import { IUserRepoResponse } from '../interfaces/UserRepoResponse.interface';
import { IUserResponse } from '../interfaces/UserResponse.interface';

export const FetchUser = async (username = 'mojombo'): Promise<IUserResponse | undefined> => {
	try {
		const response = await axios.get<IUserResponse>(`https://api.github.com/users/${username}`);
		return response.data;
	} catch (e) {
		if(e instanceof Error)
			console.log(e.message);
	}
};

export const FetchUserRepo = async (username = 'mojombo'): Promise<IUserRepoResponse[] | undefined> => {
	try {
		const response = await axios.get<IUserRepoResponse[]>(`https://api.github.com/users/${username}/repos?per_page=10`);
		return response.data;
	} catch (e) {
		if(e instanceof Error)
			console.log(e.message);
	}
};

export const SearchUserRepo = async (username = 'mojombo', query = ''): Promise<IUserRepoResponse | undefined> => {
	try {
		const response = await axios.get<IUserRepoResponse>(`https://api.github.com/repos/${username}/${query}`);
		return response.data;
	} catch (e) {
		if(e instanceof Error)
			console.log(e.message);
	}
};