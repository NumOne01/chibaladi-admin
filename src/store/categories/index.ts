import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'api/categories/models/Category';

export interface TemplatesState {
	categoryDialog: {
		open: boolean;
		initialValue: string;
		type: 'add' | 'edit';
		category?: Category;
	};
}

const initialState: TemplatesState = {
	categoryDialog: {
		open: false,
		initialValue: '',
		type: 'add'
	}
};

export const templatesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddCategoryDialog(state, action: PayloadAction<string>) {
			state.categoryDialog.open = true;
			state.categoryDialog.initialValue = action.payload;
			state.categoryDialog.category = undefined;
			state.categoryDialog.type = 'add';
		},
		closeCategoryDialog(state) {
			state.categoryDialog.open = false;
		},
		openEditCategoryDialog(state, action: PayloadAction<Category>) {
			state.categoryDialog.open = true;
			state.categoryDialog.category = action.payload;
			state.categoryDialog.type = 'edit';
		}
	}
});

export const {
	openAddCategoryDialog,
	closeCategoryDialog,
	openEditCategoryDialog
} = templatesSlice.actions;

export default templatesSlice.reducer;
