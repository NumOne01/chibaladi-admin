import { createSlice } from '@reduxjs/toolkit';

export interface TemplatesState {
	addCategoryDialog: {
		open: boolean;
	};
}

const initialState: TemplatesState = {
	addCategoryDialog: {
		open: false
	}
};

export const templatesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddCategoryDialog(state) {
			state.addCategoryDialog.open = true;
		},
		closeAddCategoryDialog(state) {
			state.addCategoryDialog.open = false;
		}
	}
});

export const { openAddCategoryDialog, closeAddCategoryDialog } =
	templatesSlice.actions;

export default templatesSlice.reducer;
