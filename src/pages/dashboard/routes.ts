import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';
import Logout from 'pages/logout';

const routes: RouteProps[] = [
	{
		path: 'templates/:id',
		component: lazy(() => import('./templates/template-edit'))
	},
	{
		path: 'templates',
		component: lazy(() => import('./templates'))
	},
	{
		path: 'categories',
		component: lazy(() => import('./categories'))
	},
	{
		path: 'videos',
		component: lazy(() => import('./videos'))
	},
	{
		path: 'logout',
		component: Logout
	},
	{
		path: 'permissions',
		component: lazy(() => import('./permissions'))
	}
];

export const defaultRoute = 'templates';
export default routes;
