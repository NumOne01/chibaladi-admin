import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Question } from 'api/templates/models/Question';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import { useState } from 'react';
import { removeQuestion } from 'api/templates';
import { useQuestions } from 'hooks/api';
import { Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { openEditQuestionDialog } from 'store/templates';

interface Props {
	question: Question;
	templateId: string;
}

export default function QuestionRow({ question, templateId }: Props) {
	const { mutate } = useQuestions(templateId);
	const [deleteQuestionLoading, setDeleteQuestionLoading] =
		useState<boolean>(false);
	const dispatch = useDispatch();

	const onDeleteQuestion = async (event: React.MouseEvent) => {
		event.stopPropagation();
		setDeleteQuestionLoading(true);
		const newQuestions = await removeQuestion(templateId, question.id);
		mutate(newQuestions);
		setDeleteQuestionLoading(false);
	};

	const onEditQuestion = () => {
		dispatch(openEditQuestionDialog({ templateId, question }));
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				classes={{ content: 'items-center', expanded: 'mb-0' }}
			>
				<Typography className="whitespace-pre-wrap">{question.text}</Typography>
				<div className="mr-auto">
					{deleteQuestionLoading ? (
						<div className="p-2">
							<CircularProgress size={24} />
						</div>
					) : (
						<div className="flex">
							<Tooltip title="ویرایش" arrow>
								<IconButton onClick={onEditQuestion}>
									<Edit color="primary" />
								</IconButton>
							</Tooltip>
							<Tooltip title="حذف" arrow>
								<IconButton onClick={onDeleteQuestion}>
									<DeleteIcon color="secondary" />
								</IconButton>
							</Tooltip>
						</div>
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
