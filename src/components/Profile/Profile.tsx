import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FetchUserRepo, SearchUserRepo } from '../../api/api';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUserRepoResponse } from '../../interfaces/UserRepoResponse.interface';
import { RouteName } from '../../router/AppRouter';
import { Loader } from '../Loader/Loader';
import { RepoCard } from '../RepoCard/RepoCard';
import { Searchbar } from '../Searchbar/Searchbar';
import styles from './Profile.module.scss';
import { IProfileProps } from './Profile.props';
import arrow from './arrow-back.svg';

export const Profile = ({
	name: userName, 
	avatar, 
	email, 
	location, 
	joinDate, 
	followers, 
	following, 
	bio
}: IProfileProps): JSX.Element => {
	const { name } = useParams();
	const { setIsLoading, setError } = useActions();
	const { isLoading } = useTypedSelector(state => state.users);
	const [ searching, setSearching ] = useState<boolean>(false);
	const [ repos, setRepos ] = useState<IUserRepoResponse[]>();

	const getUserRepo = async (): Promise<void> => {
		const repos = await FetchUserRepo(name);
		if(repos)
			setRepos(repos);
		else
			setError('server error');
	};

	const onSearch = async (reponame: string | null): Promise<void> => {
		if (!reponame) {
			setIsLoading(true);
			getUserRepo();
			setIsLoading(false);
			setSearching(false);
			return;
		} 
		try {
			setIsLoading(true);
			const repo = await SearchUserRepo(name, reponame);
			setIsLoading(false);
			if (repo) {
				setRepos([repo]);
				setSearching(false);
			} else
				setSearching(true);
		} catch(e) {
			if(e instanceof Error)
				console.log(e.message);
		}
	};

	useEffect(() => {
		getUserRepo();
	}, []);

	return (
		<div className={styles.profile}>
			<Link to={RouteName.USERS} className={styles.backArrow}><img src={arrow} alt="back" /> Back</Link>
			<div className={styles.content}>
				<img src={avatar} alt={userName} />
				<div className={styles.userInfo}>
					<h1>{userName}</h1>
					{email && <p><span>Email:</span> {email}</p>}
					{location && <p><span>Location:</span> {location}</p>}
					{joinDate && <p><span>Join Date:</span> {joinDate.slice(0, 10)}</p>}
					<p><span>Followers:</span> {followers}</p>
					<p><span>Following:</span> {following}</p>
					{bio && <p><span>Bio:</span> {bio}</p>}
				</div>
			</div>
			<div>
				<div className={styles.pageContent}>
					<Searchbar placeholder="Search for User's Repositories" onSearch={onSearch} />
					{isLoading 
						? 
							<div className={styles.loader}>
								<Loader />
							</div>
						:
							<div className='itemsGrid'>
								{
									!searching 
										?
										repos?.length && repos.map(repo => (
											<RepoCard
												key={repo.id}
												name={repo.name}
												forks={repo.forks_count}
												link={repo.html_url}
												stars={repo.stargazers_count}
											/>
										))
										:
										<p className={styles.notFoundMessage}>Not Found</p>
								}
							</div>
					}
				</div>
			</div>
		</div>
	);
};