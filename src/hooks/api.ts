import { Category } from 'api/categories/models/Category';
import { Question } from 'api/templates/models/Question';
import { TagGroup } from 'api/templates/models/TagGroup';
import { Template } from 'api/templates/models/Template';
import { Video } from 'api/videos/models/Video';
import useSWR from 'swr';

const QUIZZE_PREFIX = 'quiz/v1/template';

const VIDEOS_PREFIX = 'video/v1';

export function useTemplates() {
	const { data, error, mutate } = useSWR<Template[]>(`${QUIZZE_PREFIX}`);
	return { data, error, mutate, loading: !data && !error };
}

export function useCategories() {
	const { data, error, mutate } = useSWR<Category[]>(
		`${QUIZZE_PREFIX}/category`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useQuestions(templateId: string) {
	const { data, error, mutate } = useSWR<Question[]>(
		`${QUIZZE_PREFIX}/${templateId}/questions`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useGroupTags(templateId: string) {
	const { data, error, mutate } = useSWR<TagGroup>(
		`${QUIZZE_PREFIX}/${templateId}/tag-groups`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useVideos() {
	const { data, error, mutate } = useSWR<Video[]>(`${VIDEOS_PREFIX}/admin/v`);
	return { data, error, mutate, loading: !data && !error };
}
