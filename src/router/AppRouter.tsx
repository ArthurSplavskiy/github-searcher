import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from '../pages/Users/Users';
import User from '../pages/User/User';
import NotFound from '../pages/403/NotFound';

export enum RouteName {
	USER = '/:name',
	USERS = '/',
	NOT_FOUND = '/403'
}

const AppRouter = (): JSX.Element => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={RouteName.USERS} element={<Users />} />
				<Route path={RouteName.USER} element={<User />} />
				<Route path={RouteName.NOT_FOUND} element={<NotFound />} />
				<Route path='*' element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;