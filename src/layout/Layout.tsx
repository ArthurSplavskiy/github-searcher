import { LayoutProps } from './Layout.props';
import styles from './Layout.module.scss';
import { Navbar } from './Navbar/Navbar';
import { FunctionComponent } from 'react';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Navbar />
			<main className={styles.main}>
				<div className='container'>
					{children}
				</div>
			</main>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>): typeof Component => {
	return function withLayoutComponent (props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};