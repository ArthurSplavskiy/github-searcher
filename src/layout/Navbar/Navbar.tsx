import { FC } from 'react';
import { Link } from 'react-router-dom';
import { RouteName } from '../../router/AppRouter';
import styles from './Navbar.module.scss';
import cn from 'classnames';

export const Navbar: FC = (): JSX.Element => {
	const navigation = [
		{ name: 'Users', route: RouteName.USERS, current: true }
	];

	return (
		<nav className={styles.navbar}>
			<div className={cn(styles.container, 'container')}>
				<div className={styles.wrapper}>
					<Link className={styles.logo} to={RouteName.USERS}>Github Searcher</Link>
					<ul className={styles.navList}>
						{navigation && navigation.map(item => (
							<li key={item.route}>
								<Link className={styles.navLink} to={item.route}><span>{item.name}</span></Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
