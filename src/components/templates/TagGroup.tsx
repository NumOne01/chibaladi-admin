import { Chip, CircularProgress } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { deleteTag } from 'api/templates';
import { useGroupTags } from 'hooks/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openEditTagDialog } from 'store/templates';

interface Props {
	tags: string[];
	templateId: string;
	groupIndex: number | string;
}

export default function TagGroup({ tags, templateId, groupIndex }: Props) {
	const dispatch = useDispatch();
  const { mutate,data } = useGroupTags(templateId);

	const [loading, setLoading] = useState<boolean>(false);

	const onDelete = async () => {
		setLoading(true);
		await deleteTag(templateId, groupIndex);
    const newData = {...data};
    delete newData[groupIndex as any];
    mutate(newData);
		setLoading(false);
	};

	const onEdit = () => {
		dispatch(openEditTagDialog({ templateId, tags, groupIndex }));
	};

	return (
		<Chip
			variant="outlined"
			color="primary"
			deleteIcon={loading ? <CircularProgress size={16} /> : <Close />}
			label={tags.join(' , ')}
			classes={{
				label: 'max-w-sm'
			}}
			onDelete={onDelete}
			icon={
				loading ? (
					<></>
				) : (
					<Edit onClick={onEdit} fontSize="small" className="cursor-pointer" />
				)
			}
		/>
	);
}
