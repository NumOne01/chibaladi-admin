import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'api/templates/models/Question';
import { Template } from 'api/templates/models/Template';

export interface TemplatesState {
	addTemplateDialog: {
		open: boolean;
	};
	templateDetailsDialog: {
		open: boolean;
		template: Template | undefined;
	};
	questionDialog: {
		open: boolean;
		templateId: string;
		type: 'add' | 'edit';
		question?: Question;
	};
	tagDialog: {
		open: boolean;
		templateId: string;
		type: 'add' | 'edit';
		tags?: string[];
		groupIndex?: number | string;
	};
	statsDialog: {
		open: boolean;
		templateId: string;
	};
}

const initialState: TemplatesState = {
	addTemplateDialog: {
		open: false
	},
	templateDetailsDialog: {
		open: false,
		template: undefined
	},
	questionDialog: {
		open: false,
		templateId: '',
		type: 'add'
	},
	tagDialog: {
		open: false,
		templateId: '',
		type: 'add'
	},
	statsDialog: {
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
			state.tagDialog = {
				open: true,
				templateId: action.payload,
				type: 'add',
				tags: undefined,
				groupIndex: undefined
			};
		},
		openEditTagDialog(
			state,
			action: PayloadAction<{
				templateId: string;
				tags: string[];
				groupIndex: number | string;
			}>
		) {
			state.tagDialog = {
				open: true,
				templateId: action.payload.templateId,
				type: 'edit',
				tags: action.payload.tags,
				groupIndex: action.payload.groupIndex
			};
		},
		closeTagDialog(state) {
			state.tagDialog.open = false;
		},
		openStatsDiaolg(state, action: PayloadAction<string>) {
			state.statsDialog.open = true;
			state.statsDialog.templateId = action.payload;
		},
		closeStatsDialog(state) {
			state.statsDialog.open = false;
		},
		openTemplateDetailsDialog(state, action: PayloadAction<Template>) {
			state.templateDetailsDialog.open = true;
			state.templateDetailsDialog.template = action.payload;
		},
		closeTemplateDetailsDialog(state) {
			state.templateDetailsDialog.open = false;
		}
	}
});

export const {
	closeAddTemplateDialog,
	openAddTemplateDialog,
	closeQuestionDialog,
	openAddQuestionDialog,
	closeTagDialog,
	openAddTagDialog,
	openEditQuestionDialog,
	closeStatsDialog,
	openStatsDiaolg,
	closeTemplateDetailsDialog,
	openTemplateDetailsDialog,
	openEditTagDialog
} = templatesSlice.actions;

export default templatesSlice.reducer;
