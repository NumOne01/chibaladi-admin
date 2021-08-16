import { Request } from 'api/permissions/models/Request';
import { useRequests } from 'hooks/api';
import { useState } from 'react';
import moment from 'moment-jalaali';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openPermissionDialog } from 'store/videos';

interface Props {
	request: Request;
}

export default function PermissionCard({ request }: Props) {
	const dispatch = useDispatch();

	const onGrantPermission = () => {
		dispatch(
			openPermissionDialog({ userId: request.userId, videoId: request.videoId })
		);
	};

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-3">
				<span>ID کاربر : </span>
				<span>{request.userId}</span>
			</div>
			<div className="flex items-center justify-between mb-3">
				<span>ID ویدیو : </span>
				<span>{request.videoId}</span>
			</div>
			<div className="flex items-center justify-between mb-3">
				<span>تاریخ درخواست : </span>
				<span>
					{moment(request.permissionRequestedDate).format(
						'HH:MM - jYYYY/jM/jD'
					)}
				</span>
			</div>
			{request.permissionGrantedDate && (
				<div className="flex items-center justify-between mb-3">
					<span>تاریخ اعطای دسترسی : </span>
					<span>
						{moment(request.permissionGrantedDate).format(
							'HH:MM - jYYYY/jM/jD'
						)}
					</span>
				</div>
			)}
			{request.expirationDate && (
				<div className="flex items-center justify-between mb-3">
					<span>تاریخ انقضا : </span>
					<span>
						{moment(request.expirationDate).format('HH:MM - jYYYY/jM/jD')}
					</span>
				</div>
			)}
			<div className="flex items-center justify-between">
				<span>دسترسی :‌ </span>
				<div className="flex items-center">
					{request.hasPermission ? 'دارد' : 'ندارد'}
					<div className={`animate-pulse w-5 h-5 rounded-full ${request.hasPermission ? 'bg-green-500' : 'bg-red-500'} mr-4`}></div>
				</div>
			</div>

			<div className="mt-5">
				<Button variant="outlined" color="primary" onClick={onGrantPermission} fullWidth>
					اعطای دسترسی
				</Button>
			</div>
		</div>
	);
}
