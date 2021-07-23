import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
	closeAddQuestionDialog,
	closeAddTagDialog,
	createQuestion,
	createTag
} from 'store/templates';
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

interface From {
	groupIndex: string;
	tags: string[];
}

const initialValues: From = {
	groupIndex: '',
	tags: []
};

const validationSchema = Yup.object({
	groupIndex: Yup.string().required('ردیف سرفصل الزامی است'),
	tags: Yup.array().required('سرفصل الزامی است').min(1, 'سرفصل الزامی است')
});

export default function AddTagDialog() {
	const dispatch = useDispatch();

	const { addTagDialog, addTagLoading } = useSelector(
		(store: RootState) => store.templates
	);

	const handleClose = () => {
		dispatch(closeAddTagDialog());
	};

	const onSubmit = async (values: From, { resetForm }: FormikHelpers<From>) => {
		await dispatch(
			createTag({
				templateId: addTagDialog.templateId,
				groupIndex: Number(values.groupIndex),
				tags: values.tags
			})
		);
		resetForm();
	};

	const [tagToAdd, setTagToAdd] = useState<string>('');

	return (
		<Dialog
			open={addTagDialog.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
		>
			<AppBar position="relative">
				<DialogTitle>اضافه کردن سرفصل</DialogTitle>
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
											<div className="my-4">
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
								<FormHelperText error className="mb-5">
									{touched.tags ? errors.tags : ''}
								</FormHelperText>
								<TextField
									variant="outlined"
									placeholder="ردیف"
									label="ردیف"
									value={values.groupIndex}
									name="groupIndex"
									onChange={handleChange}
									error={touched.groupIndex && Boolean(errors.groupIndex)}
									helperText={
										touched.groupIndex && Boolean(errors.groupIndex)
											? errors.groupIndex
											: ''
									}
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
									disabled={addTagLoading}
									className="flex flex-1"
								>
									اضافه کردن
								</Button>
							</DialogActions>
						</Form>
					)}
				/>
				{addTagLoading && <LinearProgress className="mt-2 mb-4" />}
			</DialogContent>
		</Dialog>
	);
}
