import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	LinearProgress,
	TextField
} from '@material-ui/core';
import { givePermission } from 'api/permissions';
import { Transition } from 'components/transition/Transition';
import { useFormik } from 'formik';
import { useRequests } from 'hooks/api';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closePermissionDialog } from 'store/videos';
import * as Yup from 'yup';

interface Form {
	duration: number;
}

const initialValues: Form = {
	duration: 0
};

const validationSchema = Yup.object({
	duration: Yup.number().required('مدت زمان الزامی است')
});

export default function PermissionDialog() {
	const { open, userId, videoId } = useSelector(
		(store: RootState) => store.videos.permissionDialog
	);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closePermissionDialog());
	};

	const [loading, setLoading] = useState<boolean>(false);
	const { mutate, data } = useRequests();

	const onSubmit = async (values: Form) => {
		setLoading(true);
		const updatedRequest = await givePermission({
			userId,
			videoId,
			duration: values.duration
		});
		setLoading(false);
		const requestIndex = data?.findIndex(
			req => req.userId + req.videoId === userId + videoId
		);
		if (requestIndex !== -1) {
			const newData = [...(data || [])];
			newData[requestIndex || 0] = updatedRequest;
			mutate(newData);
		}
		handleClose();
	};

	const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit
		});

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			keepMounted
			TransitionComponent={Transition}
		>
			<AppBar position="relative">
				<DialogTitle>اعطای دسترسی</DialogTitle>
			</AppBar>
			<form onSubmit={handleSubmit}>
				<DialogContent className="py-10">
					<TextField
						type="number"
						variant="outlined"
						color="primary"
						placeholder="ساعت"
						fullWidth
						name="duration"
						onChange={handleChange}
						onBlur={handleBlur}
						label="ساعت"
						value={values.duration}
						error={touched.duration && Boolean(errors.duration)}
						helperText={
							touched.duration
								? errors.duration
								: 'مدت زمان را به ساعت وارد کنید'
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleClose}
						fullWidth
					>
						بازگشت
					</Button>
					<Button
						variant="outlined"
						color="primary"
						disabled={loading}
						type="submit"
						fullWidth
					>
						اعطا
					</Button>
				</DialogActions>
			</form>
			{loading && (
				<div className="my-2">
					<LinearProgress />
				</div>
			)}
		</Dialog>
	);
}
