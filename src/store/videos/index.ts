import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from 'api/videos/models/Video';

export interface VideosSliceState {
	videoDialog: {
		open: boolean;
		type: 'add' | 'edit';
		data?: Video;
	};
	playerDialog: {
		open: boolean;
		video: Video | undefined;
	};
	videosLameToken: {
		[videoId: string]: string;
	};
}

const initialState: VideosSliceState = {
	videoDialog: {
		open: false,
		type: 'add',
		data: undefined
	},
	playerDialog: {
		open: false,
		video: undefined
	},
	videosLameToken: {}
};

export const videosSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddVideoDialog(state) {
			state.videoDialog.open = true;
			state.videoDialog.type = 'add';
		},
		openEditVideoDialog(state, action: PayloadAction<Video>) {
			state.videoDialog.open = true;
			state.videoDialog.data = action.payload;
			state.videoDialog.type = 'edit';
		},
		closeVideoDialog(state) {
			state.videoDialog.open = false;
		},
		openPlayerDialog(state, action: PayloadAction<Video>) {
			state.playerDialog.open = true;
			state.playerDialog.video = action.payload;
		},
		closePlayerDialog(state) {
			state.playerDialog.open = false;
			state.playerDialog.video = undefined;
		},
		setVideoLameToken(
			state,
			action: PayloadAction<{ videoId: string | number; token: string }>
		) {
			const { token, videoId } = action.payload;
			state.videosLameToken[videoId] = token;
		},
		removeVideoLameToken(state, action: PayloadAction<string | number>) {
			delete state.videosLameToken[action.payload];
		}
	}
});

export const {
	openAddVideoDialog,
	closeVideoDialog,
	openEditVideoDialog,
	closePlayerDialog,
	openPlayerDialog,
	setVideoLameToken,
	removeVideoLameToken
} = videosSlice.actions;

export default videosSlice.reducer;
