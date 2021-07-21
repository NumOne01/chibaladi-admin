import axios from 'api';
import { CreateTemplateBody } from './models/CreateTemplateBody';
import { Template } from './models/Template';

const PREFIX = 'quiz/v1/template';

export const getTemplates = () => {
	return axios.get<Template[]>(`${PREFIX}`).then(data => data.data);
};

export const newTemplate = (template: CreateTemplateBody) => {
	return axios.post<Template>(`${PREFIX}`, template).then(data => data.data);
};
