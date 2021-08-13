import { CircularProgress, IconButton, Paper } from '@material-ui/core';
import { Delete, Edit, PlayCircleFilled } from '@material-ui/icons';
import { deleteVideo } from 'api/videos';
import { Video } from 'api/videos/models/Video';
import { useVideos } from 'hooks/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openEditVideoDialog, openPlayerDialog } from 'store/videos';

interface Props {
	video: Video;
}

export default function VideoCard({ video }: Props) {
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const { mutate } = useVideos();
	const dispatch = useDispatch();

	const onDeleteVideo = async () => {
		setDeleteLoading(true);
		await deleteVideo(video.id);
		mutate(prevData => (prevData || []).filter(v => v.id !== video.id));
		setDeleteLoading(false);
	};

	const onEditVideo = () => {
		dispatch(openEditVideoDialog(video));
	};

	const onPlayVideo = () => {
		dispatch(openPlayerDialog(video));
	};

	return (
		<Paper elevation={3}>
			<div
				className="overflow-y-hidden max-h-40 relative cursor-pointer"
				onClick={onPlayVideo}
			>
				<img
					src={`${process.env.REACT_APP_API_URL}/video/v1/admin/v/${video.id}/image`}
					alt={video.title}
				/>
				<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
					<PlayCircleFilled color="primary" fontSize="inherit" />
				</div>
			</div>

			<h2 className="p-4 text-xl">{video.title}</h2>
			<div className="p-2 text-red-500 flex items-center">
				{deleteLoading ? (
					<span className="mr-2 inline-flex items-center">
						<CircularProgress size={20} />
					</span>
				) : (
					<IconButton onClick={onDeleteVideo}>
						<Delete color="secondary" />
					</IconButton>
				)}
				<IconButton onClick={onEditVideo} className="mr-1">
					<Edit color="primary" />
				</IconButton>
			</div>
		</Paper>
	);
}
