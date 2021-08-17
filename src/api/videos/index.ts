import { AddVideoBody } from './models/AddVideoBody';
import axios from 'api';
import { Video } from './models/Video';
import { EditVideoBody } from './models/EditVideoBody';
import { CategoryInfo } from './models/CategoryInfo';

const PREFIX = 'video/v1/admin/v';

export const newVideo = (video: AddVideoBody) => {
	const formData = new FormData();
	formData.append('video', video.video || '');
	formData.append('image', video.image || '');
	formData.append('title', video.title);
	formData.append('description', video.description || '');
	formData.append('price', video.price + '');
	formData.append('level', video.level + '');
	formData.append('category', video.category);
	formData.append('tags', JSON.stringify(video.tags || []))

	return axios.post<Video>(`${PREFIX}`, formData).then(data => data.data);
};

export const deleteVideo = (videoId: number) => {
	return axios.delete(`${PREFIX}/${videoId}`);
};

export const updateVideo = (video: EditVideoBody, videoId: number) => {
	return axios
		.put<Video>(`${PREFIX}/${videoId}`, video)
		.then(data => data.data);
};

export const getVideoPermission = (videoId: number) => {
	return axios
		.post<string>(`video/v1/video-token-permit?videoId=${videoId}`)
		.then(data => data.data);
};

export const updateCategoryDetails = (
	details: string,
	videoId: number | string,
	name: string
) => {
	return axios.put<CategoryInfo>(`video/v1/info/category/${videoId}`, {
		name,
		details
	});
};
