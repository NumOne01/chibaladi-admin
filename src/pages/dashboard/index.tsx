import Layout from 'components/layout/Layout';
import LazyProgressbar from 'components/lazy-progressbar/LazyProgressbar';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { RootState } from 'store';
import routes, { defaultRoute } from './routes';

function Dashboard() {
	let { path } = useRouteMatch();
	const isAuthenticated = useSelector(
		(store: RootState) => !!store.auth.data.access_token
	);

	return isAuthenticated ? (
		<Suspense fallback={<LazyProgressbar />}>
			<Layout>
				<>
					<Switch>
						{routes.map(route => (
							<Route
								key={route.path + ''}
								{...route}
								path={`${path}/${route.path}`}
							/>
						))}
						<Redirect to={`${path}/${defaultRoute}`} />
					</Switch>
				</>
			</Layout>
		</Suspense>
	) : (
		<Redirect to="/login" />
	);
}

export default Dashboard;
