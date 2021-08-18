import {
	AppBar,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import {
	changeUserEmail,
	changeUserMobile,
	changeUserPassword
} from 'api/users';
import { User } from 'api/users/models/User';
import { Transition } from 'components/transition/Transition';
import { useFormik } from 'formik';
import { useUsers } from 'hooks/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeUserDialog } from 'store/users';

interface Form {
	password: string;
	mobile: string;
	email: string;
}

const initialValues: Form = {
	password: '',
	email: '',
	mobile: ''
};

export default function UserDialog() {
	const { open, user } = useSelector(
		(store: RootState) => store.users.userDialog
	);
	const dispatch = useDispatch();

	const { mutate, data } = useUsers();

	const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
	const [emailLoading, setEmailLoading] = useState<boolean>(false);
	const [mobileLoading, setMobileLoading] = useState<boolean>(false);

	const onChangePassword = async () => {
		setPasswordLoading(true);
		const updatedUser = await changeUserPassword(
			values.password,
			user?.id || -1
		);
		updateUser(updatedUser);
		setPasswordLoading(false);
	};

	const onChangeEmail = async () => {
		setEmailLoading(true);
		const updatedUser = await changeUserEmail(values.email, user?.id || -1);
		updateUser(updatedUser);
		setEmailLoading(false);
	};

	const onChangeMobile = async () => {
		setMobileLoading(true);
		const updatedUser = await changeUserMobile(values.mobile, user?.id || -1);
		updateUser(updatedUser);
		setMobileLoading(false);
	};

	const updateUser = (newUser: User) => {
		if (data) {
			const userIndex = data.findIndex(user => user.id === user?.id);
			if (userIndex !== -1) {
				data[userIndex] = newUser;
			}
			mutate(data);
		}
	};

	const handleClose = () => {
		dispatch(closeUserDialog());
	};

	useEffect(() => {
		if (user) {
			const { mobile, email } = user;
			setValues({ mobile, email, password: '' }, false);
		} else {
			resetForm();
		}
	}, [user]);

	const { values, handleChange, setValues, handleBlur, resetForm } = useFormik({
		initialValues,
		onSubmit: (values: Form) => {}
	});

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			keepMounted
			maxWidth="sm"
			fullWidth
			TransitionComponent={Transition}
		>
			<AppBar position="relative">
				<div className="flex justify-between items-center">
					<DialogTitle>ویرایش کاربر</DialogTitle>
					<IconButton onClick={handleClose} color="inherit" className="ml-2">
						<Close color="inherit" />
					</IconButton>
				</div>
			</AppBar>
			<DialogContent className="py-8">
				<div className="flex items-center mb-4">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="رمز عبور"
						label="رمز عبور"
						name="password"
            type="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
					/>
					{passwordLoading ? (
						<div className="mr-7 flex items-center justify-center text-center">
							<CircularProgress size={28} />
						</div>
					) : (
						<IconButton className="mr-2" onClick={onChangePassword}>
							<Check />
						</IconButton>
					)}
				</div>
				<div className="flex items-center mb-4">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="ایمیل"
						label="ایمیل"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
					/>
					{emailLoading ? (
						<div className="mr-7 flex items-center justify-center text-center">
							<CircularProgress size={28} />
						</div>
					) : (
						<IconButton className="mr-2" onClick={onChangeEmail}>
							<Check />
						</IconButton>
					)}
				</div>
				<div className="flex items-center mb-4">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="موبایل"
						label="موبایل"
						name="mobile"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.mobile}
					/>
					{mobileLoading ? (
						<div className="mr-7 flex items-center justify-center text-center">
							<CircularProgress size={28} />
						</div>
					) : (
						<IconButton className="mr-2" onClick={onChangeMobile}>
							<Check />
						</IconButton>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
