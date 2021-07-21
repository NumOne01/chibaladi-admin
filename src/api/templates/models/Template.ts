import { LEVEL } from './Level';

export interface Template {
	id: string;
	categoryId: string;
	isReady: boolean;
	level: LEVEL;
}
