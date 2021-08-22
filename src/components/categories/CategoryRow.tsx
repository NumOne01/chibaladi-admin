import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Category } from 'api/categories/models/Category';
import { CategoryInfo } from 'api/videos/models/CategoryInfo';
import { useState, MouseEvent } from 'react';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useVideoCategories } from 'hooks/api';
import { deleteVideoCategory } from 'api/videos';
import { useDispatch } from 'react-redux';
import { openEditCategoryDialog, openEditVideoCategoryDialog } from 'store/categories';
import { Edit } from '@material-ui/icons';

interface Props {
	category: Category | CategoryInfo;
	hasDelete?: boolean;
	hasEdit?: boolean;
	type?: 'video' | 'template';
}

export default function CategoryRow({ category, hasDelete, hasEdit, type = 'template' }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();

	const { mutate } = useVideoCategories();

	const onEditCategory = (event: MouseEvent) => {
		event.stopPropagation();
		dispatch(type==='template' ? 
			openEditCategoryDialog(category as any): 
			openEditVideoCategoryDialog(category as any));
	};

	const onDeleteCategory = async (event: MouseEvent) => {
		event.stopPropagation();
		setLoading(true);
		await deleteVideoCategory(category.id);
		mutate(data => data?.filter(cat => cat.id !== category.id));
		setLoading(false);
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className="flex items-center justify-between flex-1">
					<Typography variant="subtitle1">{category.name}</Typography>
					<div className="flex-1 flex justify-end">
						{loading ? (
							<div className="p-2">
								<CircularProgress size={24} />
							</div>
						) : (
							hasDelete && (
								<Tooltip title="حذف" arrow>
									<IconButton onClick={onDeleteCategory}>
										<DeleteIcon color="secondary" />
									</IconButton>
								</Tooltip>
							)
						)}
						{hasEdit && (
							<Tooltip title="ویرایش" arrow>
								<IconButton onClick={onEditCategory}>
									<Edit color="primary" />
								</IconButton>
							</Tooltip>
						)}
					</div>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{category.details}</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
