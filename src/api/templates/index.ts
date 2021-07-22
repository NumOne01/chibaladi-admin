import axios from 'api';
import { CreateTemplateBody } from './models/CreateTemplateBody';
import { Question } from './models/Question';
import { Template } from './models/Template';

const PREFIX = 'quiz/v1/template';

export const getTemplates = () => {
	return axios.get<Template[]>(`${PREFIX}`).then(data => data.data);
};

export const newTemplate = (template: CreateTemplateBody) => {
	return axios.post<Template>(`${PREFIX}`, template).then(data => data.data);
};

export const removeTemplate = (templateId: string) => {
	return axios.delete(`${PREFIX}/${templateId}`);
};

export const getQuestions = (templateId: string) => {
	return axios
		.get<Question[]>(`${PREFIX}/${templateId}/questions`)
		.then(data => data.data);
};

export const addQuestion = (question: Question, templateId: string) => {
	return axios
		.put<Question[]>(`${PREFIX}/${templateId}/questions`, question)
		.then(data => data.data);
};

export const setTemplateStatus = (templateId: string, status: boolean) => {
	return axios.put(`${PREFIX}/${templateId}/ready?isReady=${status}`);
};

export const removeQuestion = (templateId: string, questionId: string) => {
	return axios
		.delete<Question[]>(`${PREFIX}/${templateId}/questions/${questionId}`)
		.then(data => data.data);
};
