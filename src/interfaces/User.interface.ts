export interface IUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: number;
	url: string;
	html_url: string;
	followers_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	received_events_url: string;
	type: string;
	score: number;
	following_url: string;
	gists_url: string;
	starred_url: string;
	events_url: string;
	site_admin: boolean;

	name?: string;
	repo_count?: number;
	email?: string;
	location?: string;
	followers?: number;
	following?: number;
	bio?: string;
	created_at?: string;
	join_date?: string;
}