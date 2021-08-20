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
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { useState } from 'react';
import { useCategories } from 'hooks/api';
import { AddCategoryBody } from 'api/categories/models/Category';
import { newCategory, updateCategory } from 'api/categories';
import { TextField } from '@material-ui/core';
import { closeCategoryDialog } from 'store/categories';
import { useEffect } from 'react';

const initialValues: AddCategoryBody = {
	details: '',
	name: ''
};

const validationSchema = Yup.object({
	name: Yup.string().required('نام الزامی است'),
	details: Yup.string().required('توضیحات الزامی است')
});

export default function CategoryDialog() {
	const dispatch = useDispatch();
	const { mutate, data: categories } = useCategories();

	const { open, initialValue, type, category } = useSelector(
		(store: RootState) => store.categories.categoryDialog
	);

	const [addCategoryLoading, setAddCategoryLoading] = useState<boolean>(false);

	useEffect(() => {
		if (category) {
			const { details, name } = category;
			setValues({ details, name });
		} else {
			resetForm();
			setFieldValue('name', initialValue);
		}
	}, [category]);

	const handleClose = () => {
		dispatch(closeCategoryDialog());
	};

	const onSubmit = async (values: AddCategoryBody) => {
		setAddCategoryLoading(true);
		if (type === 'add') {
			const newCat = await newCategory(values);
			mutate(prevCats => [...(prevCats || []), newCat]);
		} else if (type === 'edit') {
			const editedCat = await updateCategory({
				...values,
				id: category?.id || ''
			});
			const catIndex = categories?.findIndex(cat => cat.id === category?.id);
			const newCats = [...(categories || [])];
			if (catIndex && catIndex !== -1) {
				newCats[catIndex] = editedCat;
				mutate(newCats);
			}
		}
		resetForm();
		setAddCategoryLoading(false);
		handleClose();
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		setValues,
		resetForm,
		handleSubmit,
		setFieldValue
	} = useFormik({ initialValues, onSubmit, validationSchema });

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
				<DialogTitle>
					{type === 'add' ? 'اضافه کردن' : 'ویرایش'} دسته بندی
				</DialogTitle>
			</AppBar>
			<DialogContent className="mt-7 md:px-10">
				<form onSubmit={handleSubmit}>
					<DialogContentText>
						<TextField
							name="name"
							value={values.name}
							onChange={handleChange}
							variant="outlined"
							color="primary"
							className="mb-4"
							placeholder="نام"
							disabled={type === 'edit'}
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
							{type === 'add' ? 'اضافه کردن' : 'ویرایش'}
						</Button>
					</DialogActions>
				</form>
				{addCategoryLoading && <LinearProgress className="mt-2 mb-4" />}
			</DialogContent>
		</Dialog>
	);
}
