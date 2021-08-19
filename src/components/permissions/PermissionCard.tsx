import { Request } from 'api/permissions/models/Request';
import moment from 'moment-jalaali';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openPermissionDialog } from 'store/videos';
import { useUserDetails } from 'hooks/api';
import Skeleton from '@material-ui/lab/Skeleton';

interface Props {
	request: Request;
}

export default function PermissionCard({ request }: Props) {
	const dispatch = useDispatch();

	const { data: user, loading } = useUserDetails(request.userId);

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
				<span>نام کاربری : </span>
				{loading ? (
					<Skeleton variant="text" width="70px" />
				) : (
					<span>{user?.id}</span>
				)}
			</div>
			<div className="flex items-center justify-between mb-3">
				<span>ایمیل : </span>
				{loading ? (
					<Skeleton variant="text" width="70px" />
				) : (
					<span>{user?.email}</span>
				)}
			</div>
			<div className="flex items-center justify-between mb-3">
				<span>شماره موبایل : </span>
				{loading ? (
					<Skeleton variant="text" width="70px" />
				) : (
					<span>{user?.mobile}</span>
				)}
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
					<div
						className={`animate-pulse w-5 h-5 rounded-full ${
							request.hasPermission ? 'bg-green-500' : 'bg-red-500'
						} mr-4`}
					></div>
				</div>
			</div>

			<div className="mt-5">
				<Button
					variant="outlined"
					color="primary"
					onClick={onGrantPermission}
					fullWidth
				>
					اعطای دسترسی
				</Button>
			</div>
		</div>
	);
}
