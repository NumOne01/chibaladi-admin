import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	addQuestion,
	addTag,
	getGroupTags,
	getQuestions,
	getTemplates,
	newTemplate,
	removeQuestion,
	removeTemplate,
	setTemplateStatus
} from 'api/templates';
import { CreateTemplateBody } from 'api/templates/models/CreateTemplateBody';
import { Question } from 'api/templates/models/Question';
import { TagGroup } from 'api/templates/models/TagGroup';
import { Template } from 'api/templates/models/Template';

export interface TemplatesState {
	entities: Template[];
	createLoading: boolean;
	deleteLoading: { [templateId: string]: boolean };
	addTemplateDialog: {
		open: boolean;
	};
	addQuestionDialog: {
		open: boolean;
		templateId: string;
	};
	templateTags: { [templateId: string]: TagGroup };
	templateQuestions: { [templateId: string]: Question[] };
	loading: boolean;
	changeStatusLoading: boolean;
	addQuestionLoading: boolean;
	questionsLoading: boolean;
	deleteQuestionLoading: { [questionId: string]: boolean };
	groupTagsLoading: boolean;
	addTagDialog: {
		open: boolean;
		templateId: string;
	};
	addTagLoading: boolean;
}

const initialState: TemplatesState = {
	entities: [],
	createLoading: false,
	deleteLoading: {},
	addTemplateDialog: {
		open: false
	},
	templateTags: {},
	addQuestionDialog: {
		open: false,
		templateId: ''
	},
	templateQuestions: {},
	loading: false,
	changeStatusLoading: false,
	addQuestionLoading: false,
	questionsLoading: false,
	groupTagsLoading: false,
	deleteQuestionLoading: {},
	addTagDialog: {
		open: false,
		templateId: ''
	},
	addTagLoading: false
};

export const createTemplate = createAsyncThunk(
	'templates/createTemplate',
	async (data: CreateTemplateBody) => {
		return await newTemplate(data);
	}
);

export const fetchTemplates = createAsyncThunk(
	'templates/fetchTemplates',
	async () => {
		return await getTemplates();
	}
);

export const deleteTemplate = createAsyncThunk(
	'templates/deleteTemplate',
	async (templateId: string) => {
		return await removeTemplate(templateId);
	}
);

export const fetchQuestions = createAsyncThunk(
	'templates/fetchQuestions',
	async (templateId: string) => {
		return await getQuestions(templateId);
	}
);

export const createQuestion = createAsyncThunk(
	'templates/createQuestion',
	async ({
		templateId,
		question
	}: {
		templateId: string;
		question: Question;
	}) => {
		return await addQuestion(question, templateId);
	}
);

export const changeTemplateStatus = createAsyncThunk(
	'templates/changeTemplateStatus',
	async ({ templateId, status }: { templateId: string; status: boolean }) => {
		return await setTemplateStatus(templateId, status);
	}
);

export const deleteQuestion = createAsyncThunk(
	'templates/deleteQuestion',
	async ({
		templateId,
		questionId
	}: {
		templateId: string;
		questionId: string;
	}) => {
		return await removeQuestion(templateId, questionId);
	}
);

export const fetchTagGroups = createAsyncThunk(
	'templates/fetchTagGroups',
	async (templateId: string) => {
		return await getGroupTags(templateId);
	}
);

export const createTag = createAsyncThunk(
	'templates/createTag',
	async ({
		templateId,
		groupIndex,
		tags
	}: {
		templateId: string;
		groupIndex: number;
		tags: string[];
	}) => {
		return await addTag(templateId, groupIndex, tags);
	}
);

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
	},
	extraReducers: {
		[createTemplate.fulfilled.toString()]: (
			state,
			action: PayloadAction<Template>
		) => {
			state.entities.push(action.payload);
			state.createLoading = false;
			state.addTemplateDialog.open = false;
		},
		[createTemplate.pending.toString()]: state => {
			state.createLoading = true;
		},
		[createTemplate.rejected.toString()]: state => {
			state.createLoading = false;
		},
		[fetchTemplates.pending.toString()]: state => {
			state.loading = true;
		},
		[fetchTemplates.rejected.toString()]: state => {
			state.loading = false;
		},
		[fetchTemplates.fulfilled.toString()]: (
			state,
			action: PayloadAction<Template[]>
		) => {
			state.entities = action.payload;
			state.loading = false;
		},
		[deleteTemplate.pending.toString()]: (state, action) => {
			const templateId = action.meta.arg;
			state.deleteLoading[templateId] = true;
		},
		[deleteTemplate.rejected.toString()]: (state, action) => {
			const templateId = action.meta.arg;
			state.deleteLoading[templateId] = false;
		},
		[deleteTemplate.fulfilled.toString()]: (state, action) => {
			const templateId = action.meta.arg;
			state.entities = state.entities.filter(
				template => template.id !== templateId
			);
			state.deleteLoading[templateId] = false;
		},
		[fetchQuestions.pending.toString()]: state => {
			state.questionsLoading = true;
		},
		[fetchQuestions.rejected.toString()]: state => {
			state.questionsLoading = false;
		},
		[fetchQuestions.fulfilled.toString()]: (state, action) => {
			const templateId = action.meta.arg;
			state.templateQuestions[templateId] = action.payload;
			state.questionsLoading = false;
		},
		[createQuestion.fulfilled.toString()]: (state, action) => {
			const { templateId } = action.meta.arg;
			state.templateQuestions[templateId] = action.payload;
			state.addQuestionLoading = false;
			state.addQuestionDialog.open = false;
		},
		[createQuestion.pending.toString()]: state => {
			state.addQuestionLoading = true;
		},
		[createQuestion.rejected.toString()]: state => {
			state.addQuestionLoading = false;
		},
		[changeTemplateStatus.fulfilled.toString()]: (state, action) => {
			const { templateId, status } = action.meta.arg;
			const template = state.entities.find(
				template => template.id === templateId
			);
			if (template) template.isReady = status;
			state.changeStatusLoading = false;
		},
		[changeTemplateStatus.pending.toString()]: state => {
			state.changeStatusLoading = true;
		},
		[changeTemplateStatus.rejected.toString()]: state => {
			state.changeStatusLoading = false;
		},
		[deleteQuestion.pending.toString()]: (state, action) => {
			const { questionId } = action.meta.arg;
			state.deleteQuestionLoading[questionId] = true;
		},
		[deleteQuestion.rejected.toString()]: (state, action) => {
			const { questionId } = action.meta.arg;
			state.deleteQuestionLoading[questionId] = true;
		},
		[deleteQuestion.fulfilled.toString()]: (state, action) => {
			const { questionId, templateId } = action.meta.arg;
			state.deleteQuestionLoading[questionId] = false;
			state.templateQuestions[templateId] = action.payload;
		},
		[fetchTagGroups.pending.toString()]: state => {
			state.groupTagsLoading = true;
		},
		[fetchTagGroups.rejected.toString()]: state => {
			state.groupTagsLoading = false;
		},
		[fetchTagGroups.fulfilled.toString()]: (state, action) => {
			const templateId = action.meta.arg;
			state.templateTags[templateId] = action.payload;
			state.groupTagsLoading = false;
		},
		[createTag.pending.toString()]: state => {
			state.addTagLoading = true;
		},
		[createTag.fulfilled.toString()]: (state, action) => {
			const { templateId } = action.meta.arg;
			state.templateTags[templateId] = action.payload;
			state.addTagLoading = false;
			state.addTagDialog.open = false;
		},
		[createTag.rejected.toString()]: state => {
			state.addTagLoading = false;
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
