import { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

const routes: RouteProps[] = [
	{
		path: 'templates',
		component: lazy(() => import('./templates'))
	}
];

export default routes;
