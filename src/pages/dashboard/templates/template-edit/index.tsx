import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { openAddQuestionDialog, openAddTagDialog } from 'store/templates';
import { translateLevel } from 'utils/translateLevel';
import {
	Button,
	Chip,
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
import AddTagDialog from 'components/templates/AddTagDialog';
import {
	useCategories,
	useGroupTags,
	useQuestions,
	useTemplates
} from 'hooks/api';
import { removeTemplate, setTemplateStatus } from 'api/templates';
import { Helmet } from 'react-helmet';

export default function TemplateEdit() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const { data: templates, mutate: mutateTemplates } = useTemplates();

	const template = templates?.find(template => template.id === id);

	const { data: categories } = useCategories();

	const { data: questions, loading: questionsLoading } = useQuestions(
		template?.id
	);

	const { data: groupTags, loading: groupTagsLoading } = useGroupTags(
		template?.id
	);

	const [changeStatusLoading, setChangeStatusLoading] =
		useState<boolean>(false);

	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

	const findCategoryNameById = () => {
		const category = categories?.find(
			category => category.id === template?.categoryId
		);
		return category?.name;
	};

	const onDeleteTemplate = async () => {
		setDeleteLoading(true);
		await removeTemplate(template?.id || '');
		const newTemplates = templates?.filter(t => t.id !== template?.id);
		mutateTemplates(newTemplates);
		setDeleteLoading(false);
	};

	const onAddQuestion = () => {
		dispatch(openAddQuestionDialog(id));
	};

	const onChangeTemplateStatus = async () => {
		setChangeStatusLoading(true);
		await setTemplateStatus(template?.id || '', !template?.isReady);
		const newTemplates = templates?.filter(t => t.id !== template?.id);
		if (template) {
			template.isReady = !template.isReady;
			mutateTemplates([...(newTemplates || []), template]);
		}
		setChangeStatusLoading(false);
	};

	const onAddTemplateTag = () => [dispatch(openAddTagDialog(id))];

	if (!template) return <Redirect to="/dashboard/templates" />;

	return (
		<>
			<Helmet>
				<title>ویرایش آزمون</title>
			</Helmet>
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
						<div className="mb-2">
							<span className="text-gray-500">توضیحات :‌ </span>
							{template.details}‌
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
							{deleteLoading ? (
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
				<h2 className="text-xl my-3">سرفصل ها</h2>
				<div className="mb-4">
					<Button
						color="primary"
						variant="contained"
						onClick={onAddTemplateTag}
					>
						اضافه کردن سرفصل
					</Button>
				</div>
				{groupTagsLoading ? (
					Array.from(Array(5)).map((_, index) => (
						<Skeleton
							key={index}
							variant="rect"
							width={60}
							height={28}
							className="my-8 rounded-full inline-block ml-2"
						/>
					))
				) : groupTags && Object.keys(groupTags).length === 0 ? (
					<div className="mt-8 mb-16 text-gray-600">
						سرفصلی برای این آزمون وجود ندارد
					</div>
				) : (
					<div className="flex my-8">
						{Object.values(groupTags || {}).map(tag => (
							<div key={tag} className="ml-2">
								<Chip
									variant="outlined"
									color="primary"
									label={tag.join(' , ')}
								/>
							</div>
						))}
					</div>
				)}

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
				<AddTagDialog />
				<AddQuestionDialog />
			</div>
		</>
	);
}
