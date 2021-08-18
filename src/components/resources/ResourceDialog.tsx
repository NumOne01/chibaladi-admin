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
import { useEffect } from 'react';
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

export default function ResourceDialog() {
	const { open, resource, type } = useSelector(
		(store: RootState) => store.resources.addResourceDialog
	);
	const dispatch = useDispatch();

	const { mutate } = useResources();

	const handleClose = () => {
		dispatch(closeResourceDialog());
	};

	useEffect(() => {
		if (resource) {
			setValues({ name: resource.name, file: undefined });
		} else {
			resetForm()
		}
	}, [resource]);

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = async (values: Form) => {
		if (values.file) {
			setLoading(true);
			const newResource = await addResource(values.name, values.file);
			if (type === 'add') {
				mutate(data => [...(data || []), newResource]);
			} else {
				mutate(data => {
					const newData = [...(data || [])];
					const resourceIndex = newData.findIndex(
						res => res.id === resource?.id
					);
					newData[resourceIndex] = newResource;
					return newData;
				});
			}
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
		setFieldValue,
		setValues,
		setFieldError
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema: Yup.object({
			name: Yup.string().required('نام الزامی است'),
			file: Yup.mixed().required('فایل عکس الزامی است')
		})
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
				<DialogTitle>{type === 'add' ? 'عکس جدید' : 'ویرایش عکس'}</DialogTitle>
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
						{type === 'edit' ? 'ویرایش' : 'اضافه کردن'}
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
