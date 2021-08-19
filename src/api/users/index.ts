import axiosInstance from 'api';
import { User } from './models/User';

const PREFIX = 'auth/v1/admin/u';

export const changeUserPassword = (password: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/${userId}/password?password=${password}`)
		.then(data => data.data);
};

export const changeUserMobile = (mobile: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/${userId}/mobile?mobile=${mobile}`)
		.then(data => data.data);
};

export const changeUserEmail = (email: string, userId: number) => {
	return axiosInstance
		.put<User>(`${PREFIX}/${userId}/email?email=${email}`)
		.then(data => data.data);
};

export const promoteToAdmin = (userId: number) => {
	return axiosInstance
		.post<User>(`${PREFIX}/${userId}/admin`)
		.then(data => data.data);
};
