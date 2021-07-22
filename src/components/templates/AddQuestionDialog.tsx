import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeAddQuestionDialog } from 'store/templates';
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
import { FieldArray, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { LEVEL } from 'api/templates/models/Level';
import { translateLevel } from 'utils/translateLevel';
import AppBar from '@material-ui/core/AppBar';
import { Question } from 'api/templates/models/Question';
import { Chip, IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';

const initialValues: Question = {
	id: '',
	options: [],
	score: 0,
	tags: [],
	text: ''
};

const validationSchema = Yup.object({
	text: Yup.string().required('صورت سوال الزامی است'),
	score: Yup.number().required('امتیاز سوال الزامی است'),
	options: Yup.array()
		.required('سوال گزینه ندارد')
		.min(2, 'حداقل دو گزینه الزامی است')
});

export default function AddQuestionDialog() {
	const dispatch = useDispatch();

	const { addQuestionDialog, addQuestionLoading } = useSelector(
		(store: RootState) => store.templates
	);

	const handleClose = () => {
		dispatch(closeAddQuestionDialog());
	};

	const onSubmit = async (values: Question) => {
		// resetForm();
	};

	const [tagToAdd, setTagToAdd] = useState<string>('');

	return (
		<Dialog
			open={addQuestionDialog.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
		>
			<AppBar position="relative">
				<DialogTitle>اضافه کردن سوال</DialogTitle>
			</AppBar>
			<DialogContent className="mt-7 md:px-10">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					render={({ values, handleChange, touched, errors }) => (
						<Form>
							<DialogContentText>
								<TextField
									variant="outlined"
									label="صورت سوال"
									placeholder="صورت سوال"
									name="text"
									value={values.text}
									onChange={handleChange}
									error={touched.text && Boolean(errors.text)}
									helperText={touched.text ? errors.tags : ''}
									className="mb-5"
									fullWidth
								/>
								<TextField
									variant="outlined"
									label="امتیاز سوال"
									placeholder="امتیاز سوال"
									name="score"
									type="number"
									value={values.score}
									onChange={handleChange}
									error={touched.score && Boolean(errors.score)}
									helperText={touched.score ? errors.tags : ''}
									fullWidth
								/>

								<h2 className="my-5 font-bold">سرفصل ها</h2>
								<FieldArray
									name="tags"
									render={arrayHelpers => (
										<>
											<TextField
												variant="outlined"
												label="سرفصل"
												placeholder="سرفصل"
												fullWidth
												value={tagToAdd}
												onChange={event => setTagToAdd(event.target.value)}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<Tooltip title="اضافه کردن" arrow>
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={() => arrayHelpers.push(tagToAdd)}
																	edge="end"
																>
																	{<AddIcon />}
																</IconButton>
															</Tooltip>
														</InputAdornment>
													)
												}}
											/>
											<div className="mt-4">
												{values.tags.length > 0 ? (
													values.tags.map((tag, index) => (
														<Chip
															key={index}
															label={tag}
															onDelete={() => arrayHelpers.remove(index)}
															color="primary"
															variant="outlined"
															className="ml-2"
														/>
													))
												) : (
													<div>سر فصلی اضافه نکردید</div>
												)}
											</div>
										</>
									)}
								/>

								<h2 className="mt-7 mb-5 font-bold">گزینه ها</h2>

								<FieldArray
									name="options"
									// render={}
								/>
								<TextField
									variant="outlined"
									label="صورت گزینه"
									placeholder="صورت گزینه"
									fullWidth
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Tooltip title="اضافه کردن" arrow>
													<IconButton
														aria-label="toggle password visibility"
														// onClick={handleClickShowPassword}
														// onMouseDown={handleMouseDownPassword}
														edge="end"
													>
														{<AddIcon />}
													</IconButton>
												</Tooltip>
											</InputAdornment>
										)
									}}
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
									disabled={addQuestionLoading}
									className="flex flex-1"
								>
									اضافه کردن
								</Button>
							</DialogActions>
						</Form>
					)}
				/>
				{addQuestionLoading && <LinearProgress className="mt-2 mb-4" />}
			</DialogContent>
		</Dialog>
	);
}
