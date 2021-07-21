import { LEVEL } from 'api/templates/models/Level';

export function translateLevel(level: LEVEL): string {
	switch (level) {
		case LEVEL.BASIC:
			return 'ساده';
		case LEVEL.INTERMEDIATE:
			return 'متوسط';
		case LEVEL.ADVANCED:
			return 'پیشرفته';
		default:
			return '';
	}
}
