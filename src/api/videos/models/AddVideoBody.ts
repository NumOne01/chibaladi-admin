import { LEVEL } from 'api/templates/models/Level';

export interface AddVideoBody {
	title: string;
	category: string;
	level: LEVEL;
	description?: string;
	price: number;
	tags: string[];
	video: File | null;
	image: File | null;
}
