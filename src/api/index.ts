import axios from 'axios';
import { store } from 'store';
const { REACT_APP_API_URL } = process.env;

const axiosInstance = axios.create({
	baseURL: REACT_APP_API_URL
});

axiosInstance.interceptors.response.use(undefined, function (error) {
	if (
		error.response &&
		error.response.status === 401 &&
		window.location.pathname !== '/login'
	) {
		window.location.href = '/login';
	}
	return Promise.reject(error);
});

axios.interceptors.request.use(
	config => {
		const token = store.getState().auth.data.access_token;

		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

export default axiosInstance;
