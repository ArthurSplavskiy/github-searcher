import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchUser } from '../../api/api';
import { Profile } from '../../components';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUserResponse } from '../../interfaces/UserResponse.interface';
import { withLayout } from '../../layout/Layout';
import { RouteName } from '../../router/AppRouter';

const User: FC = (): JSX.Element => {
	const { name } = useParams();
	const navigate = useNavigate();
	const { setError } = useActions();
	const { error } = useTypedSelector(state => state.users);
	const [ user, setUser ] = useState<IUserResponse>();

	const getUser = async (): Promise<void> => {
		const userData = await FetchUser(name);
		if(userData) {
			setUser(userData);
		} else {
			setError('server error');
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	if (error) {
		navigate(RouteName.NOT_FOUND);
	}

	return (
		<div className='pageContent'>
			{user && <Profile
				name={user.name}
				email={user.email}
				avatar={user.avatar_url}
				followers={user.followers}
				following={user.following}
				joinDate={user.created_at}
				location={user.location}
				bio={user.bio}
			/>}
		</div>
	);
};

export default withLayout(User);