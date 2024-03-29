import axios from 'api';
import { AddCategoryBody, Category } from './models/Category';

const PREFIX = 'quiz/v1/template';

export const getCategories = () => {
	return axios.get<Category[]>(`${PREFIX}/category`).then(data => data.data);
};

export const newCategory = (data: AddCategoryBody) => {
	return axios
		.put<Category>(`${PREFIX}/category`, data)
		.then(data => data.data);
};

export const updateCategory = (category: Category) => {
	return axios
		.put<Category>(`${PREFIX}/category/${category.id}`, undefined, {
			params: { details: category.details }
		})
		.then(data => data.data);
};
