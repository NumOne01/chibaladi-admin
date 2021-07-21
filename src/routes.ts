import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

const routes: RouteProps[] = [
	{
		path: '/login',
		component: lazy(() => import('./pages/login/Login'))
	},
	{
		path: '/dashboard',
		component: lazy(() => import('./pages/dashboard'))
	}
];

export const defaultRoute = '/dashboard';
export default routes;
