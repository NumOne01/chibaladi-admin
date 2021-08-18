import axiosInstance from 'api';
import { User } from './models/User';

const PREFIX = 'auth/v1/admin';

export const changeUserPassword = (password: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/u/${userId}/password?password=${password}`)
		.then(data => data.data);
};

export const changeUserMobile = (mobile: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/u/${userId}/mobile?mobile=${mobile}`)
		.then(data => data.data);
};

export const changeUserEmail = (email: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/u/${userId}/email?email=${email}`)
		.then(data => data.data);
};
