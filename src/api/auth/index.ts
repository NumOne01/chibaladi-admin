import axios from 'api';
import { LoginForm } from './models/LoginForm';
import { LoginResponse } from './models/LoginResponse';
import { SignupForm } from './models/SignupForm';

const URL_PREFIX = '/auth';

export const login = (data: LoginForm) => {
	const formData = new FormData();

	Object.keys(data).forEach(key => {
		formData.append(key, data[key as keyof LoginForm]);
	});

	return axios
		.post<LoginResponse>(URL_PREFIX + '/oauth/token', formData, {
			headers: {
				Authorization: 'Basic Y2hpYmFsYWRpOnRoaXNpc3NlY3JldA=='
			}
		})
		.then(data => data.data)
		.catch(error => {
			let errorMessage = '';

			switch (error.response?.data.error_description) {
				case 'Bad credentials':
					errorMessage = 'رمز عبور یا نام کاربری اشتباه است';
					break;

				default:
					errorMessage = 'مشکلی پیش آمد. لطفا دوباره تلاش کنید';
			}

			throw new Error(errorMessage);
		});
};

export const register = (data: SignupForm) => {
	return axios.post(URL_PREFIX + '/v1/user', data);
};
