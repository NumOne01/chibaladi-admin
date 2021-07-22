import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Question } from 'api/templates/models/Question';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import React from 'react';
import { deleteQuestion } from 'store/templates';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';

interface Props {
	question: Question;
	templateId: string;
}

export default function QuestionRow({ question, templateId }: Props) {
	const dispatch = useDispatch();
	const { deleteQuestionLoading } = useSelector(
		(store: RootState) => store.templates
	);

	const onDeleteQuestion = (event: React.MouseEvent) => {
		event.stopPropagation();
		dispatch(deleteQuestion({ templateId, questionId: question.id }));
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				classes={{ content: 'items-center', expanded: 'mb-0' }}
			>
				<Typography>{question.text}</Typography>
				<div className="mr-auto">
					{deleteQuestionLoading[question.id] ? (
						<div className="p-2">
							<CircularProgress size={24} />
						</div>
					) : (
						<Tooltip title="حذف" arrow>
							<IconButton onClick={onDeleteQuestion}>
								<DeleteIcon color="secondary" />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>
					{question.options.map(option => (
						<div className="my-3 text-gray-600 flex">
							<div className="w-12 mr-2">
								{option.isAnswer && <CheckIcon />}
							</div>
							{option.text}
						</div>
					))}
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
