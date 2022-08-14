import { IUser } from './User.interface';

export interface IUserSearchResponse {
	total_count: number,
	incomplete_results: boolean,
	items: IUser[];
}