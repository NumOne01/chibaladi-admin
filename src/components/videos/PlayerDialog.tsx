import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import AppBar from '@material-ui/core/AppBar';
import {
	closePlayerDialog,
	removeVideoLameToken,
	setVideoLameToken
} from 'store/videos';
import { Close } from '@material-ui/icons';
import Player from './Player';
import { CircularProgress, IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import { getVideoPermission } from 'api/videos';

export default function PlayerDialog() {
	const dispatch = useDispatch();

	const { videosLameToken, playerDialog } = useSelector(
		(store: RootState) => store.videos
	);

	const { data: auth } = useSelector((store: RootState) => store.auth);

	const { open, video } = playerDialog;

	const handleClose = () => {
		dispatch(closePlayerDialog());
	};

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		const getPermission = async () => {
			const token = await getVideoPermission(video?.id || -1);
			dispatch(setVideoLameToken({ videoId: video?.id || '', token }));
		};

		if (video) {
			getPermission();
			intervalId = setInterval(() => {
				getPermission();
			}, 240000);
		}

		return () => {
			clearInterval(intervalId);
			dispatch(removeVideoLameToken(video?.id || ''));
		};
	}, [video]);

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
		>
			<AppBar position="relative">
				<div className="flex justify-between items-center pl-5">
					<DialogTitle>{video?.title}</DialogTitle>
					<IconButton onClick={handleClose} color="inherit">
						<Close color="inherit" />
					</IconButton>
				</div>
			</AppBar>
			{!videosLameToken[video?.id || ''] ? (
				<div
					className="w-full flex justify-center items-center"
					style={{ height: 337.5 }}
				>
					<CircularProgress />
				</div>
			) : (
				<Player
					options={{
						autoplay: true,
						controls: true,
						responsive: true,
						fluid: true,
						poster: `${process.env.REACT_APP_API_URL}/video/v1/admin/v/${
							video?.id || ''
						}/image`,
						sources: [
							{
								src: `${process.env.REACT_APP_API_URL}/video/v1/admin/v/${
									video?.id
								}/video.stream?auth=${auth.access_token}&permit=${
									videosLameToken[video?.id || '']
								}`,
								type: 'video/mp4'
							}
						]
					}}
				/>
			)}
		</Dialog>
	);
}
