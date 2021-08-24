import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import AppBar from '@material-ui/core/AppBar';
import { closePlayerDialog } from 'store/videos';
import { Close } from '@material-ui/icons';
import Player from './Player';
import { CircularProgress, IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getVideoPermission } from 'api/videos';

export default function PlayerDialog() {
	const dispatch = useDispatch();

	const { playerDialog } = useSelector((store: RootState) => store.videos);

	const [loading, setLoding] = useState<boolean>(true);

	const { data: auth } = useSelector((store: RootState) => store.auth);

	const { open, video } = playerDialog;

	const handleClose = () => {
		dispatch(closePlayerDialog());
	};

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		const getPermission = async () => {
			await getVideoPermission(video?.id || -1);
		};

		if (video) {
			setLoding(true);
			getPermission();
			setTimeout(() => {
				setLoding(false);
			}, 2000);
			intervalId = setInterval(() => {
				getPermission();
			}, 1800);
		} else {
			setLoding(true);
		}

		return () => {
			setLoding(true);
			clearInterval(intervalId);
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
			{loading ? (
				<div
					className="w-full flex justify-center items-center"
					style={{ height: 337.5 }}
				>
					<CircularProgress />
				</div>
			) : (
				video && (
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
									src: `${process.env.REACT_APP_API_URL}/video/v1/admin/v/${video?.id}/video.stream?auth=${auth.access_token}`,
									type: 'video/mp4'
								}
							]
						}}
					/>
				)
			)}
		</Dialog>
	);
}
