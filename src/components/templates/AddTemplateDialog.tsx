import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { createCategory, fetchCategories } from 'store/categories';
import { closeAddTemplateDialog, createTemplate } from 'store/templates';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete, {
	createFilterOptions
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Category } from 'api/categories/models/Category';
import { useFormik } from 'formik';
import { CreateTemplateBody } from 'api/templates/models/CreateTemplateBody';
import * as Yup from 'yup';
import { LEVEL } from 'api/templates/models/Level';

interface CategoryType extends Category {
	inputValue?: string;
}

interface Form {
	level: string;
	category: CategoryType | null;
}

const initialValues: Form = {
	category: null,
	level: ''
};

const validationSchema = Yup.object({
	category: Yup.mixed().required('دسته بندی الزامی است'),
	level: Yup.string().required('سطح الزامی است')
});

const filter = createFilterOptions<CategoryType>();

const levels = [
	{ text: 'ساده', value: LEVEL.BASIC },
	{ text: 'متوسط', value: LEVEL.INTERMEDIATE },
	{ text: 'پیشرفته', value: LEVEL.ADVANCED }
];

export default function AddTemplateDialog() {
	const dispatch = useDispatch();

	const { addTemplateDialog, createLoading } = useSelector(
		(store: RootState) => store.templates
	);

	const categories = useSelector((store: RootState) =>
		store.categories.entities.map(category => ({ ...category, inputValue: '' }))
	);

	const { createCategoryLoading } = useSelector(
		(store: RootState) => store.categories
	);

	const handleClose = () => {
		dispatch(closeAddTemplateDialog());
	};

	const onSubmit = async (values: Form) => {
		const { category, level } = values;
		await dispatch(createTemplate({ level, categoryId: category?.id || '' }));
		resetForm();
	};

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	const {
		values,
		errors,
		touched,
		handleSubmit,
		handleChange,
		setFieldValue,
		resetForm
	} = useFormik({
		onSubmit,
		initialValues,
		validationSchema
	});

	return (
		<Dialog
			open={addTemplateDialog.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle id="alert-dialog-slide-title">اضافه کردن آزمون</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogContentText id="alert-dialog-slide-description">
						<FormControl fullWidth variant="outlined" className="mb-4">
							<InputLabel>سطح</InputLabel>
							<Select
								label="سطح"
								value={values.level}
								onChange={handleChange}
								name="level"
								error={touched.level && Boolean(errors.level)}
							>
								{levels.map(level => (
									<MenuItem value={level.value} key={level.value}>
										{level.text}
									</MenuItem>
								))}
							</Select>
							<FormHelperText error={touched.level && Boolean(errors.level)}>
								{errors.level}
							</FormHelperText>
						</FormControl>
						<Autocomplete
							value={values.category}
							onChange={(event, newValue) => {
								if (typeof newValue === 'string') {
									setFieldValue('category', {
										name: newValue,
										id: ''
									});
								} else if (newValue && newValue.inputValue) {
									// Create a new value from the user input
									dispatch(
										createCategory({
											name: newValue.inputValue,
											callback: value => setFieldValue('category', value)
										})
									);
								} else {
									setFieldValue('category', newValue);
								}
							}}
							noOptionsText={'دسته بندی وجود ندارد'}
							filterOptions={(options, params) => {
								const filtered = filter(options, params);

								// Suggest the creation of a new value
								if (params.inputValue !== '') {
									filtered.push({
										inputValue: params.inputValue,
										name: `اضافه کردن دسته بندی "${params.inputValue}"`,
										id: ''
									});
								}

								return filtered;
							}}
							selectOnFocus
							clearOnBlur
							loadingText="لطفا منتظر بمانید ..."
							loading={createCategoryLoading}
							fullWidth
							disabled={createCategoryLoading}
							handleHomeEndKeys
							options={categories}
							getOptionLabel={option => {
								// Value selected with enter, right from the input
								if (typeof option === 'string') {
									return option;
								}
								// Add "xxx" option created dynamically
								if (option.inputValue) {
									return option.inputValue;
								}
								// Regular option
								return option.name;
							}}
							renderOption={option => option.name}
							renderInput={params => (
								<TextField
									{...params}
									label="دسته بندی"
									error={touched.category && Boolean(errors.category)}
									helperText={
										touched.category && Boolean(errors.category)
											? errors.category
											: ''
									}
									variant="outlined"
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<>
												{createCategoryLoading ? (
													<CircularProgress color="inherit" size={20} />
												) : null}
												{params.InputProps.endAdornment}
											</>
										)
									}}
								/>
							)}
						/>
					</DialogContentText>
					<DialogActions className="mt-8">
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
							disabled={createLoading}
							className="flex flex-1"
						>
							اضافه کردن
						</Button>
					</DialogActions>
					{createLoading && <LinearProgress className="mt-2 mb-4" />}
				</form>
			</DialogContent>
		</Dialog>
	);
}
