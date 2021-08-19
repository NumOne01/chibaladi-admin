import { useVideoCategories, useVideos } from 'hooks/api';
import VideoDialog from 'components/videos/VideoDialog';
import { Helmet } from 'react-helmet';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openAddVideoDialog } from 'store/videos';
import VideoCard from 'components/videos/VideoCard';
import Skeleton from '@material-ui/lab/Skeleton';
import PlayerDialog from 'components/videos/PlayerDialog';

export default function Videos() {
	const { data: videos, loading } = useVideos();
	const {} = useVideoCategories();
	const dispatch = useDispatch();

	const handleAddVideo = () => {
		dispatch(openAddVideoDialog());
	};

	return (
		<>
			<Helmet>
				<title>ویدیو ها</title>
			</Helmet>
			<div>
				<div className="mb-6 pr-2">
					<Button color="primary" variant="contained" onClick={handleAddVideo}>
						ویدیو جدید
					</Button>
				</div>
				{loading ? (
					<Grid container>
						{Array.from(Array(8)).map((_, index) => (
							<Grid key={index} sm={6} md={4} className="p-4" item>
								<Skeleton variant="rect" className="w-full" height={280} />
							</Grid>
						))}
					</Grid>
				) : (
					<Grid container>
						{videos?.map(video => (
							<Grid key={video.id} sm={6} md={4} className="p-4" item>
								<VideoCard video={video} />
							</Grid>
						))}
					</Grid>
				)}
			</div>
			<VideoDialog />
			<PlayerDialog />
		</>
	);
}
