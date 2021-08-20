import axios from 'api';
import { CreateTemplateBody } from './models/CreateTemplateBody';
import { Question } from './models/Question';
import { TagGroup } from './models/TagGroup';
import { Template } from './models/Template';
import { TemplateStats } from './models/TemplateStats';

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

export const getGroupTags = (templateId: string) => {
	return axios
		.get<TagGroup>(`${PREFIX}/${templateId}/tag-groups`)
		.then(data => data.data);
};

export const addTag = (
	templateId: string,
	groupIndex: number,
	tags: string[]
) => {
	return axios
		.put<TagGroup>(`${PREFIX}/${templateId}/tag-groups/${groupIndex}`, tags)
		.then(data => data.data);
};

export const getTemplateStats = (templateId: number | string) => {
	return axios
		.post<TemplateStats>(`quiz/stats/quiz/${templateId}/general`)
		.then(data => data.data);
};
