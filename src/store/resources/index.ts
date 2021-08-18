import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource } from 'api/resources/models/Resource';

interface ResourcesState {
	addResourceDialog: {
		open: boolean;
		resource?: Resource;
		type: 'add' | 'edit';
	};

	resourceInfoDialog: {
		open: boolean;
	}
}

const initialState: ResourcesState = {
	addResourceDialog: {
		open: false,
		type: 'add'
	},
	resourceInfoDialog: {
		open: false
	}
};

const resourcesSlice = createSlice({
	initialState,
	name: 'resources',
	reducers: {
		openAddResourceDialog(state) {
			state.addResourceDialog.open = true;
			state.addResourceDialog.type = 'add';
			state.addResourceDialog.resource = undefined;
		},
		closeResourceDialog(state) {
			state.addResourceDialog.open = false;
		},
		openEditResourceDialog(state, action: PayloadAction<Resource>) {
			state.addResourceDialog.open = true;
			state.addResourceDialog.resource = action.payload;
			state.addResourceDialog.type = 'edit';
		},
		openResourceInfoDialog(state) {
			state.resourceInfoDialog.open = true;
		},
		closeResourceInfoDialog(state) {
			state.resourceInfoDialog.open = false;
		}
	}
});

export const {
	closeResourceDialog,
	openAddResourceDialog,
	openEditResourceDialog,
	closeResourceInfoDialog,
	openResourceInfoDialog
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
