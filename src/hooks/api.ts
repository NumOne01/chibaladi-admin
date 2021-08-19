import { Category } from 'api/categories/models/Category';
import { Request } from 'api/permissions/models/Request';
import { Resource } from 'api/resources/models/Resource';
import { Question } from 'api/templates/models/Question';
import { TagGroup } from 'api/templates/models/TagGroup';
import { Template } from 'api/templates/models/Template';
import { User } from 'api/users/models/User';
import { CategoryInfo } from 'api/videos/models/CategoryInfo';
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

export function useRequests() {
	const { data, error, mutate } = useSWR<Request[]>(
		`${VIDEOS_PREFIX}/admin/requests`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useResources() {
	const { data, error, mutate } = useSWR<Resource[]>(
		`${VIDEOS_PREFIX}/resources/all`
	);
	return { data, error, mutate, loading: !data && !error };
}

export function useUsers() {
	const { data, error, mutate } = useSWR<User[]>(`auth/v1/admin/u`);
	return { data, error, mutate, loading: !data && !error };
}

export function useUserDetails(userId: number | string) {
	const { data, error, mutate } = useSWR<User>(`auth/v1/admin/u/${userId}`);
	return { data, error, mutate, loading: !data && !error };
}

export function useVideoCategories() {
	const { data, error, mutate } = useSWR<CategoryInfo[]>(
		`video/v1/info/category`
	);
	return { data, error, mutate, loading: !data && !error };
}
