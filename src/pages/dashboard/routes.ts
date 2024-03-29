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
		path: 'categories/templates',
		component: lazy(() => import('./categories/templates'))
	},
	{
		path: 'categories/videos',
		component: lazy(() => import('./categories/videos'))
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
	},
	{
		path: 'users',
		component: lazy(() => import('./users'))
	},
	{
		path: 'resources',
		component: lazy(() => import('./resources'))
	}
];

export const defaultRoute = 'templates';
export default routes;
