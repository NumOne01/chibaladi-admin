import { LEVEL } from 'api/templates/models/Level';

export interface EditVideoBody {
	title: string;
	category: string;
	level: LEVEL;
	description: string;
	price: number;
	tags: string[];
}
