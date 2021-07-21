import { Template } from 'api/templates/models/Template';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { translateLevel } from 'utils/translateLevel';

interface Props {
	template: Template;
}

export default function TemplateCard({ template }: Props) {
	const { entities: categories } = useSelector(
		(store: RootState) => store.categories
	);

	const findCategoryNameById = () => {
		const category = categories.find(
			category => category.id === template.categoryId
		);
		return category?.name;
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
				<div>
					<span className="text-gray-500">وضعیت :‌ </span>
					{template.isReady ? 'فعال' : 'غیرفعال'}‌
				</div>
			</Paper>
		</div>
	);
}
