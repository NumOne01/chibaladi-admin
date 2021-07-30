import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { useState } from 'react';
import { useCategories } from 'hooks/api';
import { AddCategoryBody } from 'api/categories/models/Category';
import { newCategory } from 'api/categories';
import { TextField } from '@material-ui/core';
import { closeAddCategoryDialog } from 'store/categories';

const initialValues: AddCategoryBody = {
	details: '',
	name: ''
};

const validationSchema = Yup.object({
	details: Yup.string().required('توضیحات الزامی است'),
	name: Yup.string().required('نام الزامی است')
});

export default function AddCategoryDialog() {
	const dispatch = useDispatch();
	const { mutate } = useCategories();

	const { open } = useSelector(
		(store: RootState) => store.categories.addCategoryDialog
	);

	const [addCategoryLoading, setAddCategoryLoading] = useState<boolean>(false);

	const handleClose = () => {
		dispatch(closeAddCategoryDialog());
	};

	const onSubmit = async (
		values: AddCategoryBody,
		{ resetForm }: FormikHelpers<AddCategoryBody>
	) => {
		setAddCategoryLoading(true);
		const newCat = await newCategory(values);
		mutate(prevCats => [...(prevCats || []), newCat]);
		resetForm();
		setAddCategoryLoading(false);
		handleClose();
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
		>
			<AppBar position="relative">
				<DialogTitle>اضافه کردن دسته بندی</DialogTitle>
			</AppBar>
			<DialogContent className="mt-7 md:px-10">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					render={({ values, handleChange, touched, errors }) => (
						<Form
							onKeyDown={event => {
								if (event.key === 'Enter') {
									event.preventDefault();
								}
							}}
						>
							<DialogContentText>
								<TextField
									name="name"
									value={values.name}
									onChange={handleChange}
									variant="outlined"
									color="primary"
									className="mb-4"
									placeholder="نام"
									label="نام"
									error={touched.name && Boolean(errors.name)}
									helperText={touched.name ? errors.name : ''}
									fullWidth
								/>
								<TextField
									name="details"
									value={values.details}
									onChange={handleChange}
									variant="outlined"
									color="primary"
									multiline
									minRows={2}
									placeholder="توضیحات"
									label="توضیحات"
									error={touched.details && Boolean(errors.details)}
									helperText={touched.details ? errors.details : ''}
									fullWidth
								/>
							</DialogContentText>
							<DialogActions className="mt-7">
								<Button
									onClick={handleClose}
									color="secondary"
									variant="outlined"
									className="flex flex-1"
								>
									بازگشت
								</Button>
								<Button
									type="submit"
									color="primary"
									variant="outlined"
									disabled={addCategoryLoading}
									className="flex flex-1"
								>
									اضافه کردن
								</Button>
							</DialogActions>
						</Form>
					)}
				/>
				{addCategoryLoading && <LinearProgress className="mt-2 mb-4" />}
			</DialogContent>
		</Dialog>
	);
}
