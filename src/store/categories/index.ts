import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'api/categories/models/Category';

export interface TemplatesState {
	categoryDialog: {
		open: boolean;
		initialValue: string;
		type: 'add' | 'edit';
		category?: Category;
		categoryType: 'video' | 'template';
	};
}

const initialState: TemplatesState = {
	categoryDialog: {
		open: false,
		initialValue: '',
		type: 'add',
		categoryType: 'template'
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
			state.categoryDialog.categoryType = 'template';
		},
		openEditVideoCategoryDialog(state, action: PayloadAction<Category>) {
			state.categoryDialog.open = true;
			state.categoryDialog.category = action.payload;
			state.categoryDialog.type = 'edit';
			state.categoryDialog.categoryType = 'video';
		}
	}
});

export const {
	openAddCategoryDialog,
	closeCategoryDialog,
	openEditCategoryDialog,
	openEditVideoCategoryDialog
} = templatesSlice.actions;

export default templatesSlice.reducer;
