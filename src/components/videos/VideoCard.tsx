import { CircularProgress, IconButton, Paper } from '@material-ui/core';
import { Delete, Edit, PlayCircleFilled } from '@material-ui/icons';
import { deleteVideo, getVideoPermission } from 'api/videos';
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
	const [loading, setLoading] = useState<boolean>(false);

	const onDeleteVideo = async () => {
		setDeleteLoading(true);
		await deleteVideo(video.id);
		mutate(prevData => (prevData || []).filter(v => v.id !== video.id));
		setDeleteLoading(false);
	};

	const onEditVideo = () => {
		dispatch(openEditVideoDialog(video));
	};

	const onPlayVideo = async () => {
		setLoading(true);
		await getVideoPermission(video.id || -1);
		setLoading(false);
		dispatch(openPlayerDialog(video));
	};

	return (
		<Paper elevation={3} className="flex flex-col justify-between h-full">
			<div
				className="overflow-y-hidden max-h-40 relative cursor-pointer"
				onClick={onPlayVideo}
			>
				<img
					src={`${process.env.REACT_APP_API_URL}/video/v1/admin/v/${video.id}/image`}
					alt={video.title}
					className="w-full"
				/>
				<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
					{loading ? (
						<CircularProgress />
					) : (
						<PlayCircleFilled color="primary" fontSize="inherit" />
					)}
				</div>
			</div>

			<div className="px-4 pb-2 pt-4">
				<h2 className="text-lg">{video.title}</h2>
				<p className="mb-2 mt-3 text-gray-700">{video.description}</p>
				<div className="text-red-500 flex items-center">
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
			</div>
		</Paper>
	);
}
