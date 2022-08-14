import { FC } from 'react';
import styles from './Loader.module.scss';
import { LoaderProps } from './LoaderProps.props';
import cn from 'classnames';

export const Loader: FC<LoaderProps> = ({className, ...props}): JSX.Element => {
	return (
		<div className={cn(className, styles.loader)} {...props}></div>
	);
};