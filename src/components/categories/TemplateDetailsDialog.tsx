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
import { editTemplateDetails } from 'api/templates';
import { Transition } from 'components/transition/Transition';
import { useFormik } from 'formik';
import { useTemplates } from 'hooks/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeTemplateDetailsDialog } from 'store/templates';

interface Form {
	details: string;
}

const initialValues: Form = {
	details: ''
};

export default function TemplateDetailsDialog() {
	const [loading, setLoading] = useState<boolean>(false);

	const { mutate, data: templates } = useTemplates();

	const { open, template } = useSelector(
		(store: RootState) => store.templates.templateDetailsDialog
	);
	const dispatch = useDispatch();

	const onSubmit = async (values: Form) => {
		setLoading(true);
		await editTemplateDetails(template?.id || '', values.details);
		const templateIndex = templates?.findIndex(
			temp => template?.id === temp.id
		);
		if (templateIndex && templateIndex !== -1) {
			const updatedTemplate = { ...template, details: values.details };
			const newTemplates = [...(templates || [])];
			newTemplates[templateIndex] = updatedTemplate as any;
			mutate(newTemplates, false);
		}
		setLoading(false);
		handleClose();
	};

	const handleClose = () => {
		dispatch(closeTemplateDetailsDialog());
	};

	useEffect(() => {
		if (template) {
			setValues({ details: template.details });
		}
	}, [template]);

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setValues
	} = useFormik({ initialValues, onSubmit });

	return (
		<Dialog
			open={open}
			maxWidth="sm"
			fullWidth
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			<AppBar position="relative">
				<DialogTitle> ویرایش توضیحات </DialogTitle>
			</AppBar>
			<form onSubmit={handleSubmit}>
				<DialogContent className="py-10">
					<TextField
						variant="outlined"
						color="primary"
						fullWidth
						value={values.details}
						error={touched.details && Boolean(errors.details)}
						helperText={touched.details ? errors.details : ''}
						onChange={handleChange}
						onBlur={handleBlur}
						name="details"
						placeholder="توضیحات"
						label="توضیحات"
						multiline
						minRows={2}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="outlined"
						fullWidth
						onClick={handleClose}
					>
						لغو
					</Button>
					<Button
						color="primary"
						variant="outlined"
						disabled={loading}
						type="submit"
						fullWidth
					>
						ذخیره
					</Button>
				</DialogActions>
			</form>
			{loading && (
				<div className="my-2">
					<LinearProgress variant="indeterminate" />
				</div>
			)}
		</Dialog>
	);
}
