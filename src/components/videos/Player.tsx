import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

interface Props {
	options: VideoJsPlayerOptions;
}

export const Player = (props: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const { options } = props;

	// This seperate functional component fixes the removal of the videoelement
	// from the DOM when calling the dispose() method on a player
	const VideoHtml = () => (
		<div data-vjs-player>
			<video ref={videoRef} className="video-js vjs-big-play-centered" />
		</div>
	);

	useEffect(() => {
		const videoElement = videoRef.current;
		let player: VideoJsPlayer;
		if (videoElement) {
			player = videojs(videoElement, { ...options }, () => {});
			videoElement.oncontextmenu = () => false;
		}
		return () => {
			if (player) {
				player.dispose();
			}
		};
	}, [options]);

	return <VideoHtml />;
};

export default Player;
