import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTemplates, newTemplate, removeTemplate } from 'api/templates';
import { CreateTemplateBody } from 'api/templates/models/CreateTemplateBody';
import { Template } from 'api/templates/models/Template';

export interface TemplatesState {
	entities: Template[];
	createLoading: boolean;
	deleteLoading: { [templateId: string]: boolean };
	addTemplateDialog: {
		open: boolean;
	};
	loading: boolean;
}

const initialState: TemplatesState = {
	entities: [],
	createLoading: false,
	deleteLoading: {},
	addTemplateDialog: {
		open: false
	},
	loading: false
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

export const templatesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {
		openAddTemplateDialog(state) {
			state.addTemplateDialog.open = true;
		},
		closeAddTemplateDialog(state) {
			state.addTemplateDialog.open = false;
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
		}
	}
});

export const { closeAddTemplateDialog, openAddTemplateDialog } =
	templatesSlice.actions;

export default templatesSlice.reducer;
