import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'api/users/models/User';

interface UsersState {
	userDialog: {
		open: boolean;
		user: User | undefined;
	};
}

const initialState: UsersState = {
	userDialog: {
		open: false,
		user: undefined 
	}
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		openUserDialog(state, action: PayloadAction<User>) {
			state.userDialog.open = true;
			state.userDialog.user = action.payload;
		},
		closeUserDialog(state) {
			state.userDialog.open = false;
		}
	}
});

export const { closeUserDialog, openUserDialog } = usersSlice.actions;

export default usersSlice.reducer;
