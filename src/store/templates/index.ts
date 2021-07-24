import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TemplatesState {
	addTemplateDialog: {
		open: boolean;
	};
	addQuestionDialog: {
		open: boolean;
		templateId: string;
	};
	addTagDialog: {
		open: boolean;
		templateId: string;
	};
}

const initialState: TemplatesState = {
	addTemplateDialog: {
		open: false
	},
	addQuestionDialog: {
		open: false,
		templateId: ''
	},
	addTagDialog: {
		open: false,
		templateId: ''
	}
};

export const templatesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddTemplateDialog(state) {
			state.addTemplateDialog.open = true;
		},
		closeAddTemplateDialog(state) {
			state.addTemplateDialog.open = false;
		},
		openAddQuestionDialog(state, action: PayloadAction<string>) {
			state.addQuestionDialog.open = true;
			state.addQuestionDialog.templateId = action.payload;
		},
		closeAddQuestionDialog(state) {
			state.addQuestionDialog.open = false;
		},
		openAddTagDialog(state, action: PayloadAction<string>) {
			state.addTagDialog.open = true;
			state.addTagDialog.templateId = action.payload;
		},
		closeAddTagDialog(state) {
			state.addTagDialog.open = false;
		}
	}
});

export const {
	closeAddTemplateDialog,
	openAddTemplateDialog,
	closeAddQuestionDialog,
	openAddQuestionDialog,
	closeAddTagDialog,
	openAddTagDialog
} = templatesSlice.actions;

export default templatesSlice.reducer;
