import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormHelperText,
	LinearProgress,
	TextField
} from '@material-ui/core';
import { addResource } from 'api/resources';
import { Transition } from 'components/transition/Transition';
import { useFormik } from 'formik';
import { useResources } from 'hooks/api';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeResourceDialog } from 'store/resources';
import * as Yup from 'yup';

interface Form {
	name: string;
	file: File | undefined;
}

const initialValues: Form = {
	name: '',
	file: undefined
};

const validationSchema = Yup.object({
	name: Yup.string().required('نام الزامی است'),
	file: Yup.mixed().required('فایل عکس الزامی است')
});

export default function ResourceDialog() {
	const { open } = useSelector(
		(store: RootState) => store.resources.addResourceDialog
	);
	const dispatch = useDispatch();

	const { mutate } = useResources();

	const handleClose = () => {
		dispatch(closeResourceDialog());
	};

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = async (values: Form) => {
		if (values.file) {
			setLoading(true);
			const newResource = await addResource(values.name, values.file);
			mutate(data => [...(data || []), newResource]);
			resetForm();
			setLoading(false);
			handleClose();
		}
	};

	const {
		values,
		errors,
		touched,
		resetForm,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue
	} = useFormik({ initialValues, onSubmit, validationSchema });

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
				<DialogTitle>عکس جدید</DialogTitle>
			</AppBar>
			<form onSubmit={handleSubmit}>
				<DialogContent className="py-10 max-w-lg mx-auto">
					<TextField
						name="name"
						placeholder="نام"
						label="نام"
						variant="outlined"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						fullWidth
						error={touched.name && Boolean(errors.name)}
						helperText={touched.name ? errors.name : ''}
					/>
					<div className="mt-7">
						<Button variant="contained" color="primary" component="label">
							انتخاب فایل عکس
							<input
								type="file"
								hidden
								accept="image/png, image/gif, image/jpeg"
								onChange={event => {
									if (event.target.files) {
										const image = event.target.files[0];
										setFieldValue('file', image);
									}
								}}
							/>
						</Button>
						<span className="mr-5">{values.file?.name}</span>
						<FormHelperText error className="mt-2">
							{touched.file ? errors.file : ''}
						</FormHelperText>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth
						color="secondary"
						variant="outlined"
						onClick={handleClose}
					>
						بازگشت
					</Button>
					<Button
						fullWidth
						color="primary"
						variant="outlined"
						type="submit"
						disabled={loading}
					>
						اضافه کردن
					</Button>
				</DialogActions>
				{loading && (
					<div className="my-2">
						<LinearProgress variant="indeterminate" />
					</div>
				)}
			</form>
		</Dialog>
	);
}
