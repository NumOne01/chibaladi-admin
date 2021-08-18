import { Resource } from 'api/resources/models/Resource';
import {
	IconButton,
	Paper,
	CircularProgress,
	Tooltip
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useState } from 'react';
import { deleteResource } from 'api/resources';
import { useResources } from 'hooks/api';
import { useDispatch } from 'react-redux';
import resources, { openEditResourceDialog } from 'store/resources';

interface Props {
	resourse: Resource;
}

export default function ResourceCard({ resourse }: Props) {
	const { mutate } = useResources();

	const [loading, setLoading] = useState<Boolean>(false);

	const dispatch = useDispatch();

	const onDeleteResource = async () => {
		setLoading(true);
		await deleteResource(resourse.name);
		mutate(data => data?.filter(res => res.id !== resourse.id));
		setLoading(false);
	};

	const onEditResource = () => {
		dispatch(openEditResourceDialog(resourse));
	};

	return (
		<Paper elevation={3} className="h-full flex flex-col justify-between">
			<div className="overflow-y-hidden max-h-48 relative">
				<img
					src={`${process.env.REACT_APP_API_URL}/video/v1/resources/${resourse.id}/content`}
					alt={resourse.name}
				/>
			</div>
			<div className="px-3 flex justify-between items-center">
				<h2 className="text-lg py-4">{resourse.name}</h2>
				<div className="flex">
					{loading ? (
						<CircularProgress size={18} />
					) : (
						<div className="flex">
							<Tooltip title="حذف" arrow>
								<IconButton onClick={onDeleteResource}>
									<Delete color="secondary" />
								</IconButton>
							</Tooltip>
							<Tooltip title="ویرایش" arrow>
								<IconButton onClick={onEditResource}>
									<Edit color="primary" />
								</IconButton>
							</Tooltip>
						</div>
					)}
				</div>
			</div>
		</Paper>
	);
}
