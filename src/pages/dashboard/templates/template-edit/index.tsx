import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { fetchQuestions, openAddQuestionDialog } from 'store/templates';
import { translateLevel } from 'utils/translateLevel';
import { deleteTemplate } from 'store/templates';
import {
	Button,
	CircularProgress,
	IconButton,
	Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddQuestionDialog from 'components/templates/AddQuestionDialog';

export default function TemplateEdit() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const template = useSelector((store: RootState) =>
		store.templates.entities.find(template => template.id === id)
	);
	const { deleteLoading } = useSelector((store: RootState) => store.templates);
	const { entities: categories } = useSelector(
		(store: RootState) => store.categories
	);
	const questions = useSelector(
		(store: RootState) => store.templates.templateQuestions[id]
	);

	const findCategoryNameById = () => {
		const category = categories.find(
			category => category.id === template?.categoryId
		);
		return category?.name;
	};

	const onDeleteTemplate = () => {
		dispatch(deleteTemplate(template?.id || ''));
	};

	const onAddQuestion = () => {
		dispatch(openAddQuestionDialog(id));
	};

	useEffect(() => {
		if (!questions) dispatch(fetchQuestions(id));
	}, []);

	if (!template) return <Redirect to="/dashboard/templates" />;

	return (
		<>
			<div className="mb-2">
				<span className="text-gray-500">دسته بندی : </span>
				{findCategoryNameById()}
			</div>
			<div className="mb-2">
				<span className="text-gray-500">سطح :‌ </span>
				{translateLevel(template.level)}
			</div>
			<div className="mb-2">
				<span className="text-gray-500">وضعیت :‌ </span>
				{template.isReady ? 'فعال' : 'غیرفعال'}‌
			</div>
			<div className="flex items-center">
				<div className="mr-2">
					{deleteLoading[template.id] ? (
						<CircularProgress size={24} />
					) : (
						<Tooltip title="حذف" arrow>
							<IconButton onClick={onDeleteTemplate}>
								<DeleteIcon color="secondary" />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</div>
			<div>سوال ها</div>
			<div>
				<Button color="primary" variant="contained" onClick={onAddQuestion}>
					اضافه کردن سوال
				</Button>
			</div>
			<div>
				{!questions || questions.length === 0 ? (
					<div>سوالی برای این آزمون وجود ندارد</div>
				) : (
					questions.map(question => <div key={question.id}></div>)
				)}
			</div>
			<AddQuestionDialog />
		</>
	);
}
