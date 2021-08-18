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
import {
	FieldArray,
	Form,
	FormikHelpers,
	FormikProvider,
	useFormik
} from 'formik';
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { useState } from 'react';
import {
	Chip,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip
} from '@material-ui/core';
import { closeVideoDialog } from 'store/videos';
import { AddVideoBody } from 'api/videos/models/AddVideoBody';
import { LEVEL } from 'api/templates/models/Level';
import { translateLevel } from 'utils/translateLevel';
import SelectCategory from 'components/categories/SelectCategory';
import { newVideo, updateCategoryDetails, updateVideo } from 'api/videos';
import { useVideos } from 'hooks/api';
import { useEffect } from 'react';
import { EditVideoBody } from 'api/videos/models/EditVideoBody';
import { Video } from 'api/videos/models/Video';
import AddIcon from '@material-ui/icons/Add';

const initialValues: AddVideoBody = {
	category: '',
	image: null,
	level: LEVEL.BASIC,
	price: 0,
	title: '',
	tags: [],
	video: null,
	description: ''
};

const levels = [
	{ text: translateLevel(LEVEL.BASIC), value: LEVEL.BASIC },
	{ text: translateLevel(LEVEL.INTERMEDIATE), value: LEVEL.INTERMEDIATE },
	{ text: translateLevel(LEVEL.ADVANCED), value: LEVEL.ADVANCED },
	{ text: translateLevel(LEVEL.GENERAL), value: LEVEL.GENERAL }
];

export default function AddVideoDialog() {
	const dispatch = useDispatch();
	const { mutate } = useVideos();

	const { open, type, data } = useSelector(
		(store: RootState) => store.videos.videoDialog
	);

	const [videoLoading, setVideoLoading] = useState<boolean>(false);

	const handleClose = () => {
		dispatch(closeVideoDialog());
		resetForm();
	};

	const onSubmit = async (
		values: AddVideoBody,
		{ resetForm }: FormikHelpers<AddVideoBody>
	) => {
		setVideoLoading(true);
		let promise: Promise<Video>;
		if (type === 'add') {
			promise = newVideo(values);
		} else {
			const { category, level, price, title, description, tags } = values;
			const editVideoBody: EditVideoBody = {
				category,
				level,
				price,
				title,
				description: description || '',
				tags: tags || []
			};
			promise = updateVideo(editVideoBody, data?.id || -1);
		}
		const addedVideo = await promise;
		mutate(prevData => [...(prevData || []), addedVideo]);
		if (categoryDetails) {
			await updateCategoryDetails(categoryDetails, addedVideo.category);
		}
		resetForm();
		setVideoLoading(false);
		handleClose();
	};

	const formik = useFormik({
		initialValues: data
			? {
					category: data.category,
					level: data.level,
					image: null,
					video: null,
					description: data.description,
					price: data.price,
					title: data.title,
					tags: data.tags
			  }
			: initialValues,
		onSubmit,
		enableReinitialize: true,
		validationSchema: Yup.object({
			category: Yup.string().required('دسته بندی الزامی است'),
			title: Yup.string().required('عنوان الزامی است'),
			price: Yup.string().required('قیمت الزامی است'),
			level: Yup.string().required('سطح الزامی است'),
			video:
				type === 'add' ? Yup.mixed().required('ویدیو الزامی است') : Yup.mixed(),
			image:
				type === 'add' ? Yup.mixed().required('عکس الزامی است') : Yup.mixed()
		})
	});

	const { values, touched, errors, setFieldValue, handleChange, resetForm } =
		formik;

	const [tagToAdd, setTagToAdd] = useState<string>('');

	const [categoryDetails, setCategoryDetails] = useState<string>('');

	useEffect(() => {
		setCategoryDetails('');
	}, [data]);

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
					{type === 'add' ? 'اضافه کردن' : 'ویرایش'} ویدئو
				</DialogTitle>
			</AppBar>
			<DialogContent className="mt-7 md:px-10">
				<FormikProvider value={formik}>
					<Form
						onKeyDown={event => {
							if (event.key === 'Enter') {
								event.preventDefault();
							}
						}}
					>
						<DialogContentText>
							<TextField
								name="title"
								value={values.title}
								onChange={handleChange}
								variant="outlined"
								color="primary"
								className="mb-4"
								placeholder="عنوان"
								label="عنوان"
								error={touched.title && Boolean(errors.title)}
								helperText={touched.title ? errors.title : ''}
								fullWidth
							/>
							<TextField
								name="description"
								value={values.description}
								onChange={handleChange}
								variant="outlined"
								color="primary"
								className="mb-4"
								placeholder="توضیحات"
								label="توضیحات"
								multiline
								minRows={2}
								fullWidth
							/>
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
							<TextField
								name="category"
								value={values.category}
								onChange={handleChange}
								variant="outlined"
								color="primary"
								className="mb-4"
								placeholder="دسته بندی"
								label="دسته بندی"
								error={touched.category && Boolean(errors.category)}
								helperText={touched.category ? errors.category : ''}
								fullWidth
							/>
							<TextField
								name="price"
								value={categoryDetails}
								onChange={event => {
									setCategoryDetails(event.target.value);
								}}
								variant="outlined"
								color="primary"
								className="mb-4"
								placeholder="توضیحات دسته بندی"
								label="توضیحات دسته بندی"
								fullWidth
								multiline
								minRows={2}
							/>
							<TextField
								name="price"
								value={values.price}
								onChange={handleChange}
								variant="outlined"
								color="primary"
								className="mb-4"
								placeholder="قیمت"
								type="number"
								label="قیمت"
								fullWidth
								error={touched.price && Boolean(errors.price)}
								helperText={touched.price ? errors.price : ''}
							/>
							<h2 className="my-5 font-bold text-gray-600 text-lg">برچسب ها</h2>
							<FieldArray
								name="tags"
								render={arrayHelpers => (
									<>
										<TextField
											variant="outlined"
											label="برچسب"
											placeholder="برچسب"
											fullWidth
											value={tagToAdd}
											onChange={event => setTagToAdd(event.target.value)}
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
										<div className="mt-4 mb-8">
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
												<div className="text-sm">برچسبی اضافه نکرده اید</div>
											)}
										</div>
									</>
								)}
							/>
							{type === 'add' && (
								<>
									<Button variant="contained" color="primary" component="label">
										انتخاب فایل ویدئو
										<input
											type="file"
											hidden
											accept="video/mp4,video/x-m4v,video/*"
											onChange={event => {
												if (event.target.files) {
													const video = event.target.files[0];
													setFieldValue('video', video);
												}
											}}
										/>
									</Button>
									<span className="mr-5">{values.video?.name}</span>
									<FormHelperText error className="mt-2">
										{touched.video ? errors.video : ''}
									</FormHelperText>
									<div className="mt-7">
										<Button
											variant="contained"
											color="primary"
											component="label"
										>
											انتخاب فایل عکس
											<input
												type="file"
												hidden
												accept="image/png, image/gif, image/jpeg"
												onChange={event => {
													if (event.target.files) {
														const image = event.target.files[0];
														setFieldValue('image', image);
													}
												}}
											/>
										</Button>
										<span className="mr-5">{values.image?.name}</span>
										<FormHelperText error className="mt-2">
											{touched.image ? errors.image : ''}
										</FormHelperText>
									</div>
								</>
							)}
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
								disabled={videoLoading}
								className="flex flex-1"
							>
								{type === 'add' ? 'اضافه کردن' : 'ویرایش'}
							</Button>
						</DialogActions>
					</Form>
				</FormikProvider>
				{videoLoading && <LinearProgress className="mt-2 mb-4" />}
			</DialogContent>
		</Dialog>
	);
}
