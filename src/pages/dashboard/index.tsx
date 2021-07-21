import Layout from 'components/layout/Layout';
import LazyProgressbar from 'components/lazy-progressbar/LazyProgressbar';
import { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import routes from './routes';

function Dashboard() {
	let { path } = useRouteMatch();

	return (
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
					</Switch>
				</>
			</Layout>
		</Suspense>
	);
}

export default Dashboard;
