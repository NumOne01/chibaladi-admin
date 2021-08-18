import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import templatesReducer from './templates';
import videosReducer from './videos';
import categoriesReducer from './categories';
import resourcesReducer from './resources';
import usersReducer from './users';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	auth: authReducer,
	templates: templatesReducer,
	categories: categoriesReducer,
	videos: videosReducer,
	resources: resourcesReducer,
	users: usersReducer
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth']
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
