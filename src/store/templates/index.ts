import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newTemplate } from 'api/templates';
import { CreateTemplateBody } from 'api/templates/models/CreateTemplateBody';
import { Template } from 'api/templates/models/Template';

export interface TemplatesState {
	entities: Template[];
	createLoading: boolean;
	addTemplateDialog: {
		open: boolean;
	};
}

const initialState: TemplatesState = {
	entities: [],
	createLoading: false,
	addTemplateDialog: {
		open: false
	}
};

export const createTemplate = createAsyncThunk(
	'templates/createTemplate',
	async (data: CreateTemplateBody) => {
		return await newTemplate(data);
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
		}
	}
});

export const { closeAddTemplateDialog, openAddTemplateDialog } =
	templatesSlice.actions;

export default templatesSlice.reducer;
