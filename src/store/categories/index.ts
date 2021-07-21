import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories, newCategory } from 'api/categories';
import { Category } from 'api/categories/models/Category';

export interface CategoriesState {
	entities: Category[];
	loading: boolean;
	error: string;
	createCategoryLoading: boolean;
}

const initialState: CategoriesState = {
	entities: [],
	loading: false,
	error: '',
	createCategoryLoading: false
};

export const fetchCategories = createAsyncThunk(
	'templates/fetchCategories',
	async () => {
		return await getCategories();
	}
);

export const createCategory = createAsyncThunk(
	'templates/createCategory',
	async ({
		name,
		callback
	}: {
		name: string;
		callback: (category: Category) => void;
	}) => {
		const res = await newCategory(name);
		callback(res);
		return res;
	}
);

export const categoriesSlice = createSlice({
	name: 'templates',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchCategories.fulfilled.toString()]: (
			state,
			action: PayloadAction<Category[]>
		) => {
			state.entities = action.payload;
			state.loading = false;
		},
		[fetchCategories.pending.toString()]: state => {
			state.loading = true;
		},
		[fetchCategories.rejected.toString()]: state => {
			state.loading = false;
		},
		[createCategory.pending.toString()]: state => {
			state.createCategoryLoading = true;
		},
		[createCategory.rejected.toString()]: state => {
			state.createCategoryLoading = false;
		},
		[createCategory.fulfilled.toString()]: (
			state,
			action: PayloadAction<Category>
		) => {
			state.entities.push(action.payload);
			state.createCategoryLoading = false;
		}
	}
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
