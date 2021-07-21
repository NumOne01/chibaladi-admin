import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes, { defaultRoute } from 'routes';
import './App.css';

function App() {
	return (
		<Suspense fallback={null}>
			<Switch>
				{routes.map(route => (
					<Route key={route.path + ''} {...route} />
				))}
				<Redirect to={defaultRoute} />
			</Switch>
		</Suspense>
	);
}

export default App;
