import { createSlice } from '@reduxjs/toolkit';

interface ResourcesState {
	addResourceDialog: {
		open: boolean;
	};
}

const initialState: ResourcesState = {
	addResourceDialog: {
		open: false
	}
};

const resourcesSlice = createSlice({
	initialState,
	name: 'resources',
	reducers: {
		openAddResourceDialog(state) {
			state.addResourceDialog.open = true;
		},
		closeResourceDialog(state) {
			state.addResourceDialog.open = false;
		}
	}
});

export const { closeResourceDialog, openAddResourceDialog } =
	resourcesSlice.actions;

export default resourcesSlice.reducer;
