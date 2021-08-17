import { Resource } from 'api/resources/models/Resource';
import {
	IconButton,
	Paper,
	CircularProgress,
	Tooltip
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useState } from 'react';
import { deleteResource } from 'api/resources';

interface Props {
	resourse: Resource;
}

export default function ResourceCard({ resourse }: Props) {
	const [loading, setLoading] = useState<Boolean>(false);

	const onDeleteResource = async () => {
		setLoading(true);
		await deleteResource(resourse.name);
		setLoading(false);
	};

	return (
		<Paper elevation={3}>
			<div className="overflow-y-hidden max-h-48 relative cursor-pointer">
				<img
					src={`${process.env.REACT_APP_API_URL}/video/v1/resources/${resourse.id}/content`}
					alt={resourse.name}
				/>
			</div>
			<div className="px-2 flex justify-between items-center">
				<h2 className="text-lg py-4">{resourse.name}</h2>
				{loading ? (
					<CircularProgress size={18} />
				) : (
					<Tooltip title="حذف" arrow>
						<IconButton onClick={onDeleteResource}>
							<Delete color="secondary" />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Paper>
	);
}
