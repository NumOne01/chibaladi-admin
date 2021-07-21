import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RTL from 'hoc/RTL';
import { BrowserRouter as Router } from 'react-router-dom';
import 'nprogress/nprogress.css';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'theme/theme';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import NProgress from 'nprogress';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RTL>
					<ThemeProvider theme={theme}>
						<Router>
							<App />
						</Router>
					</ThemeProvider>
				</RTL>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
