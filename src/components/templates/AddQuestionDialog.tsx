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
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { Question } from 'api/templates/models/Question';
import {
	Chip,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Radio,
	Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { addQuestion } from 'api/templates';
import { useQuestions } from 'hooks/api';

const initialValues: Question = {
	id: '',
	options: [],
	score: 0,
	tags: [],
	text: ''
};

const validationSchema = Yup.object({
	text: Yup.string().required('صورت سوال الزامی است'),
	score: Yup.number()
		.required('امتیاز سوال الزامی است')
		.min(1, 'امتیاز سوال باید حداقل ۱ باشد'),
	options: Yup.array()
		.required('سوال گزینه ندارد')
		.min(2, 'حداقل دو گزینه الزامی است')
});

export default function AddQuestionDialog() {
	const dispatch = useDispatch();

	const { open, templateId } = useSelector(
		(store: RootState) => store.templates.addQuestionDialog
	);

	const { mutate } = useQuestions(templateId);

	const handleClose = () => {
		dispatch(closeAddQuestionDialog());
	};

	const [addQuestionLoading, setAddQuestionLoading] = useState<boolean>(false);

	const onSubmit = async (
		values: Question,
		{ resetForm }: FormikHelpers<Question>
	) => {
		if (answer === -1) {
			setAnswerError('یک گزینه را به عنوان گزینه صحیح انتخاب کنید');
		} else {
			values.options[answer].isAnswer = true;
			setAddQuestionLoading(true);
			const newQuestions = await addQuestion(values, templateId);
			mutate(newQuestions);
			setAddQuestionLoading(false);
			resetForm();
			handleClose();
		}
	};

	const [tagToAdd, setTagToAdd] = useState<string>('');
	const [optionToAdd, setOptionToAdd] = useState<string>('');
	const [answer, setAnswer] = useState<number>(-1);
	const [answerError, setAnswerError] = useState<string>('');

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
				<DialogTitle>اضافه کردن سوال</DialogTitle>
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
									variant="outlined"
									label="صورت سوال"
									placeholder="صورت سوال"
									name="text"
									value={values.text}
									onChange={handleChange}
									error={touched.text && Boolean(errors.text)}
									helperText={touched.text ? errors.text : ''}
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
									helperText={touched.score ? errors.score : ''}
									fullWidth
								/>

								<h2 className="my-5 font-bold text-gray-600 text-lg">
									سرفصل ها
								</h2>
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
												helperText="داشتن سرفصل باعث  میشود بررسی نتایج آزمون دقیق تر انجام شود"
												onKeyDown={e => {
													if (e.key === 'Enter' && tagToAdd) {
														arrayHelpers.push(tagToAdd);
														setTagToAdd('');
													}
												}}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<Tooltip title="اضافه کردن" arrow>
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={() => {
																		if (tagToAdd) {
																			arrayHelpers.push(tagToAdd);
																			setTagToAdd('');
																		}
																	}}
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
															onDelete={() => {
																arrayHelpers.remove(index);
																setTagToAdd('');
															}}
															color="primary"
															variant="outlined"
															className="ml-2"
														/>
													))
												) : (
													<div className="text-sm">سر فصلی اضافه نکرده اید</div>
												)}
											</div>
										</>
									)}
								/>

								<h2 className="mt-7 mb-5 font-bold text-gray-600 text-lg">
									گزینه ها
								</h2>

								<FieldArray
									name="options"
									render={arrayHelpers => (
										<>
											<TextField
												variant="outlined"
												label="صورت گزینه"
												placeholder="صورت گزینه"
												value={optionToAdd}
												onChange={event => setOptionToAdd(event.target.value)}
												fullWidth
												onKeyDown={e => {
													if (e.key === 'Enter' && optionToAdd) {
														arrayHelpers.push({
															id: '',
															text: optionToAdd,
															isAnswer: false
														});
														setOptionToAdd('');
													}
												}}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<Tooltip title="اضافه کردن" arrow>
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={() => {
																		if (optionToAdd) {
																			arrayHelpers.push({
																				id: '',
																				text: optionToAdd,
																				isAnswer: false
																			});
																			setOptionToAdd('');
																		}
																	}}
																	edge="end"
																>
																	{<AddIcon />}
																</IconButton>
															</Tooltip>
														</InputAdornment>
													)
												}}
											/>
											<div className="my-3">
												{values.options.length > 0 ? (
													<List>
														{values.options.map((option, index) => (
															<ListItem>
																<ListItemIcon>
																	<Radio
																		checked={answer === index}
																		onChange={() => setAnswer(index)}
																		value={index}
																		name="answer"
																		color="primary"
																	/>
																</ListItemIcon>
																<ListItemText primary={option.text} />
																<ListItemSecondaryAction>
																	<IconButton
																		edge="end"
																		aria-label="delete"
																		onClick={() => {
																			arrayHelpers.remove(index);
																			if (answer === index) setAnswer(-1);
																		}}
																	>
																		<DeleteIcon />
																	</IconButton>
																</ListItemSecondaryAction>
															</ListItem>
														))}
													</List>
												) : (
													<div className="text-sm">
														گزینه ای اضافه نکرده اید
													</div>
												)}
											</div>
											<FormHelperText error>
												{touched.options ? errors.options : ''}
											</FormHelperText>
											<FormHelperText error>
												{answer === -1 ? answerError : ''}
											</FormHelperText>
										</>
									)}
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
