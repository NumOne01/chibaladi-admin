import axiosInstance from 'api';
import { Resource } from './models/Resource';

const PREFIX = 'video/v1';

export const deleteResource = () => {
	return axiosInstance.delete(`${PREFIX}/resources`);
};

export const getResourceByName = (name: string) => {
	return axiosInstance
		.get<Resource>(`${PREFIX}/resources?name=${name}`)
		.then(data => data.data);
};

export const addResource = (name: string, file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	return axiosInstance
		.put<Resource>(`${PREFIX}/resources?name=${name}`, formData)
		.then(data => data.data);
};
