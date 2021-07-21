import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';
import Logout from 'pages/logout';

const routes: RouteProps[] = [
	{
		path: 'templates',
		component: lazy(() => import('./templates'))
	},
	{
		path: 'logout',
		component: Logout
	}
];

export const defaultRoute = 'templates';
export default routes;
