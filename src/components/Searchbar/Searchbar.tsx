import { ChangeEvent, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import styles from './Searchbar.module.scss';
import { ISearchbarProps } from './Searchbar.props';

export const Searchbar = ({ onSearch, ...props }: ISearchbarProps): JSX.Element => {
	const [ searchValue, setSearchValue ] = useState<string>('');
	const debouncedCallback = useDebounce(onSearch, 500);

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const query = e.target.value.toLowerCase();
		setSearchValue(query);
		debouncedCallback(query);
	};

	return <input
		className={styles.input}
		type="text"
		value={searchValue}
		onChange={onChange} 
		{...props}
	/>;
};