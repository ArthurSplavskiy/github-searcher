import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Searchbar, Loader, UserCard } from '../../components';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { withLayout } from '../../layout/Layout';
import { RouteName } from '../../router/AppRouter';
import styles from './Users.module.scss';

const Users: FC = (): JSX.Element => {
	const navigate = useNavigate();
	const { fetchUsers, setError } = useActions();
	const { users, isLoading, error } = useTypedSelector(state => state.users);

	useEffect(() => {
		fetchUsers();
	}, []);

	const onSearch = async (username: string | null): Promise<void> => {
		if (!username) {
			fetchUsers();
			return;
		} 
		try {
			fetchUsers(username);
		} catch(e) {
			if(e instanceof Error)
				setError(e.message);
		}
	};

	if (error) {
		navigate(RouteName.NOT_FOUND);
	}
	
	return (
		<div className={styles.users}>	
			{
				<div className='pageContent'>
					<Searchbar placeholder="Search for Users" onSearch={onSearch} />
					{isLoading 
						? 
							<div className={styles.loader}>
								<Loader />
							</div>
						:
						<div className='itemsGrid'>
							{users.map(user => <UserCard key={user.node_id} user={user} />)}
						</div>
					}
				</div>
			}
		</div>
	);
};

export default withLayout(Users);