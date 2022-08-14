import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { withLayout } from '../../layout/Layout';
import { RouteName } from '../../router/AppRouter';
import styles from './NotFound.module.scss';

const NotFound = (): JSX.Element => {
	const navigate = useNavigate();
	const { setError } = useActions();

	const clickHandler = (): void => {
		setError('');
		navigate(RouteName.USERS);
	};

	return (
		<div className={styles.root}>
			<h1>403 Forbidden</h1>
			<p>The request was a legal request, but the server is refusing to respond to it</p>
			<button onClick={clickHandler} className={styles.backButton}>home page</button>
		</div>
	);
};

export default withLayout(NotFound);