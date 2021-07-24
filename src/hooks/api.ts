import { Category } from 'api/categories/models/Category';
import { Question } from 'api/templates/models/Question';
import { TagGroup } from 'api/templates/models/TagGroup';
import { Template } from 'api/templates/models/Template';
import useSWR from 'swr';

const PREFIX = 'quiz/v1/template';

export function useTemplates() {
	const { data, error, mutate } = useSWR<Template[]>(`${PREFIX}`);
	return { data, error, mutate, loading: !data && !error };
}

export function useCategories() {
	const { data, error, mutate } = useSWR<Category[]>(`${PREFIX}/category`);
	return { data, error, mutate, loading: !data && !error };
}

export function useQuestions(templateId: string) {
	const { data, error, mutate } = useSWR<Question[]>(
		`${PREFIX}/${templateId}/questions`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useGroupTags(templateId: string) {
	const { data, error, mutate } = useSWR<TagGroup>(
		`${PREFIX}/${templateId}/tag-groups`
	);
	return { data, error, mutate, loading: !data && !error };
}
