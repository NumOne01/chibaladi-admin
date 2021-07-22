import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
	changeTemplateStatus,
	fetchQuestions,
	openAddQuestionDialog
} from 'store/templates';
import { translateLevel } from 'utils/translateLevel';
import { deleteTemplate } from 'store/templates';
import {
	Button,
	CircularProgress,
	Divider,
	IconButton,
	Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddQuestionDialog from 'components/templates/AddQuestionDialog';
import QuestionRow from 'components/templates/QuestionRow';
import AsyncSwitch from 'components/async-switch/AsyncSwitch';
import Skeleton from '@material-ui/lab/Skeleton';

export default function TemplateEdit() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const template = useSelector((store: RootState) =>
		store.templates.entities.find(template => template.id === id)
	);
	const { deleteLoading, changeStatusLoading, questionsLoading } = useSelector(
		(store: RootState) => store.templates
	);
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

	const onChangeTemplateStatus = () => {
		dispatch(
			changeTemplateStatus({
				templateId: template?.id || '',
				status: !template?.isReady
			})
		);
	};

	if (!template) return <Redirect to="/dashboard/templates" />;

	return (
		<div className="max-w-2xl mx-auto py-3">
			<div className="flex items-start mb-3">
				<div className="text-lg flex-1">
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
				</div>
				<div className="flex items-center">
					<div>
						<Tooltip title="تغییر وضعیت آزمون" arrow>
							<AsyncSwitch
								checked={template.isReady}
								loading={changeStatusLoading}
								handleChange={onChangeTemplateStatus}
							/>
						</Tooltip>
					</div>
					<div>
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
			</div>

			<Divider />
			<h2 className="text-xl my-3">سوال ها</h2>
			<div className="mb-4">
				<Button color="primary" variant="contained" onClick={onAddQuestion}>
					اضافه کردن سوال
				</Button>
			</div>
			{questionsLoading ? (
				Array.from(Array(2)).map((_, index) => (
					<Skeleton key={index} variant="rect" height={72} className="mb-2" />
				))
			) : (
				<div>
					{!questions || questions.length === 0 ? (
						<div className="mt-8 text-gray-600">
							سوالی برای این آزمون وجود ندارد
						</div>
					) : (
						questions.map(question => (
							<QuestionRow
								templateId={id}
								key={question.id}
								question={question}
							/>
						))
					)}
				</div>
			)}
			<AddQuestionDialog />
		</div>
	);
}
