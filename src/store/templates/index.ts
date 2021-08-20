import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'api/templates/models/Question';

export interface TemplatesState {
	addTemplateDialog: {
		open: boolean;
	};
	questionDialog: {
		open: boolean;
		templateId: string;
		type: 'add' | 'edit';
		question?: Question;
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
	questionDialog: {
		open: false,
		templateId: '',
		type: 'add'
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
			state.questionDialog.open = true;
			state.questionDialog.templateId = action.payload;
			state.questionDialog.type = 'add';
			state.questionDialog.question = undefined;
		},
		openEditQuestionDialog(
			state,
			action: PayloadAction<{ templateId: string; question: Question }>
		) {
			const { question, templateId } = action.payload;

			state.questionDialog.open = true;
			state.questionDialog.type = 'edit';
			state.questionDialog.question = question;
			state.questionDialog.templateId = templateId;
		},
		closeQuestionDialog(state) {
			state.questionDialog.open = false;
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
	closeQuestionDialog,
	openAddQuestionDialog,
	closeAddTagDialog,
	openAddTagDialog,
	openEditQuestionDialog
} = templatesSlice.actions;

export default templatesSlice.reducer;
