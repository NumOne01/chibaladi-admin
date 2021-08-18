import { IconButton, Paper } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { User } from 'api/users/models/User';
import moment from 'moment-jalaali';
import { useDispatch } from 'react-redux';
import { openUserDialog } from 'store/users';

interface Props {
	user: User;
}

export default function UserCard({ user }: Props) {
	const dispatch = useDispatch();

	const onOpenUserDialog = () => {
		dispatch(openUserDialog(user));
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
					<span className="text-gray-600">نقش ها</span> : {user.roles}
				</li>
				<li className="mb-1">
					<span className="text-gray-600">تاریخ تولد</span> :{' '}
					{user.birthDate
						? moment(user.birthDate).format('jYYYY/jMM/jDD')
						: 'تعیین نشده'}
				</li>
			</ul>
			<IconButton onClick={onOpenUserDialog}>
				<Edit color="primary" />
			</IconButton>
		</Paper>
	);
}
