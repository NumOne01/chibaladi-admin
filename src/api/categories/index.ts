import axios from 'api';
import { Category } from './models/Category';

const PREFIX = 'quiz/v1/template';

export const getCategories = () => {
	return axios.get<Category[]>(`${PREFIX}/category`).then(data => data.data);
};

export const newCategory = (name: string) => {
	return axios
		.put<Category>(`${PREFIX}/category`, { name })
		.then(data => data.data);
};
