import styles from './RepoCard.module.scss';
import { RepoCardProps } from './RepoCardProps.props';

export const RepoCard = ({name, link, forks, stars}: RepoCardProps): JSX.Element => {
	return (
		<a href={link} target="_blank" rel="noreferrer" className={styles.card}>
			<div className={styles.name}>{name}</div>
			<div>
				<div className={styles.reposCount}>Forks: <span>{forks}</span></div>
				<div className={styles.reposCount}>Stars: <span>{stars}</span></div>
			</div>
		</a>
	);
};