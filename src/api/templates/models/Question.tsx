export interface Question {
	id: string;
	text: string;
	score: number;
	tags: string[];
	options: QuestionOption[];
}

export interface QuestionOption {
	id: string;
	text: string;
	isAnswer: true;
}
