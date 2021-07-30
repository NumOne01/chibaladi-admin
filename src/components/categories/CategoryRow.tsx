import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Category } from 'api/categories/models/Category';

interface Props {
	category: Category;
}

export default function CategoryRow({ category }: Props) {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1">{category.name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{category.details}</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
