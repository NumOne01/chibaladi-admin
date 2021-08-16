import axiosInstance from 'api';
import { GivePermissionBody } from './models/GivePermissionBody';
import { Request } from './models/Request';

const PREFIX = 'video/v1';

export const givePermission = (data: GivePermissionBody) => {
	const { duration, userId, videoId } = data;

	return axiosInstance
		.post<Request>(
			`${PREFIX}/admin/requests?videoId=${videoId}&userId=${userId}&duration=${duration}`
		)
		.then(data => data.data);
};
