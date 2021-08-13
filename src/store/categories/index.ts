import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TemplatesState {
	addCategoryDialog: {
		open: boolean;
		initialValue: string;
	};
}

const initialState: TemplatesState = {
	addCategoryDialog: {
		open: false,
		initialValue: ''
	}
};

export const templatesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddCategoryDialog(state, action: PayloadAction<string>) {
			state.addCategoryDialog.open = true;
			state.addCategoryDialog.initialValue = action.payload;
		},
		closeAddCategoryDialog(state) {
			state.addCategoryDialog.open = false;
		}
	}
});

export const { openAddCategoryDialog, closeAddCategoryDialog } =
	templatesSlice.actions;

export default templatesSlice.reducer;
