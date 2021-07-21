import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from 'api/auth/models/LoginResponse';

export interface AuthState {
	data: LoginResponse;
}

const initialState: AuthState = {
	data: {
		access_token: '',
		expires_in: -1,
		jti: '',
		refresh_token: '',
		scope: '',
		token_type: '',
		user_id: -1
	}
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<LoginResponse>) {
			state.data = action.payload;
		}
	}
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
