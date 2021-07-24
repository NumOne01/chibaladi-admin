import { Template } from 'api/templates/models/Template';
import Paper from '@material-ui/core/Paper';
import { translateLevel } from 'utils/translateLevel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { useCategories, useTemplates } from 'hooks/api';
import { useState } from 'react';
import { removeTemplate } from 'api/templates';

interface Props {
	template: Template;
}

export default function TemplateCard({ template }: Props) {
	const { data: categories } = useCategories();

	const { mutate: mutateTemplates, data: templates } = useTemplates();

	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

	const findCategoryNameById = () => {
		const category = categories?.find(
			category => category.id === template.categoryId
		);
		return category?.name;
	};

	const { path } = useRouteMatch();

	const onDeleteTemplate = async () => {
		setDeleteLoading(true);
		await removeTemplate(template.id);
		const newTemplates = templates?.filter(t => t.id !== template.id);
		mutateTemplates(newTemplates);
		setDeleteLoading(false);
	};

	return (
		<div className="px-2">
			<Paper className="p-5 text-base">
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
					<Link to={`${path}/${template.id}`}>
						<Tooltip title="ویرایش" arrow>
							<IconButton>
								<EditIcon color="primary" />
							</IconButton>
						</Tooltip>
					</Link>
					<div className="mr-2">
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
			</Paper>
		</div>
	);
}
