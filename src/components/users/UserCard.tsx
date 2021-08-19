import {
	CircularProgress,
	IconButton,
	Paper,
	Tooltip
} from '@material-ui/core';
import { Edit, Group } from '@material-ui/icons';
import { promoteToAdmin } from 'api/users';
import { Role } from 'api/users/models/Role';
import { User } from 'api/users/models/User';
import { useUsers } from 'hooks/api';
import moment from 'moment-jalaali';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openUserDialog } from 'store/users';

interface Props {
	user: User;
}

export default function UserCard({ user }: Props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const { data, mutate } = useUsers();

	const onOpenUserDialog = () => {
		dispatch(openUserDialog(user));
	};

	const updateUser = (updatedUser: User) => {
		const newData = [...(data || [])];
		const userIndex = newData.findIndex(u => u.id === user.id);
		newData[userIndex] = updatedUser;
		mutate(newData);
	};

	const onPromoteToAdmin = async () => {
		setLoading(true);
		const updatedUser = await promoteToAdmin(user.id);
		updateUser(updatedUser);
		setLoading(false);
	};

	return (
		<Paper elevation={3} className="p-4">
			<ul>
				<li className="mb-1">
					<span className="text-gray-600">ایمیل</span> : {user.email}
				</li>
				<li className="mb-1">
					<span className="text-gray-600">شماره موبایل</span> : {user.mobile}
				</li>
				<li className="mb-1">
					<span className="text-gray-600">نام</span> : {user.firstName}
				</li>
				<li className="mb-1">
					<span className="text-gray-600">نام خانوادگی</span> : {user.lastName}
				</li>
				<li className="mb-1" dir="ltr">
					{user.id} : <span className="text-gray-600">ID</span>
				</li>
				<li className="mb-1">
					<span className="text-gray-600">نقش ها</span> :{' '}
					{user.roles.join(' , ')}
				</li>
				<li className="mb-1">
					<span className="text-gray-600">تاریخ تولد</span> :{' '}
					{user.birthDate
						? moment(user.birthDate).format('jYYYY/jMM/jDD')
						: 'تعیین نشده'}
				</li>
			</ul>
			<div className="flex items-center">
				<IconButton onClick={onOpenUserDialog}>
					<Edit color="primary" />
				</IconButton>
				{loading ? (
					<div className="flex items-center mr-2">
						<CircularProgress size={18} />
					</div>
				) : (
					<Tooltip
						title={
							user.roles.includes(Role.ADMIN)
								? 'حذف نفش ادمین'
								: 'ارتقا به ادمین'
						}
						arrow
					>
						<IconButton onClick={onPromoteToAdmin}>
							<Group color="primary" />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Paper>
	);
}
