import { LEVEL } from 'api/templates/models/Level';

export interface Video {
	id: number;
	title: string;
	category: string;
	level: LEVEL;
	description: string;
	price: number;
	tags: string[];
	imageUrl: string;
	videoUrl: string;
}
