import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISearchbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onSearch: (s: string | null) => Promise<void>
}