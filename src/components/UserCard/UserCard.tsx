import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { UserCardProps } from './UserCard.props';

export const UserCard = ({user}: UserCardProps): JSX.Element => {
	return (
		<Link to={user.login} className={styles.card}>
			<img src={user.avatar_url} alt={user.login} />
			<div className={styles.name}>{user.login}</div>
			<div className={styles.reposCount}>Repositories: <span>{user.repo_count}</span></div>
		</Link>
	);
};