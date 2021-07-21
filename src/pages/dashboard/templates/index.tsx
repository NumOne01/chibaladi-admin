import Button from '@material-ui/core/Button';
import AddTemplateDialog from 'components/templates/AddTemplateDialog';
import { useDispatch } from 'react-redux';
import { openAddTemplateDialog } from 'store/templates';

export default function Templates() {
	const dispatch = useDispatch();

	const onAddTemplate = () => {
		dispatch(openAddTemplateDialog());
	};

	return (
		<>
			<div>
				<div>
					<Button color="primary" variant="contained" onClick={onAddTemplate}>
						آزمون جدید
					</Button>
				</div>
			</div>
			<AddTemplateDialog />
		</>
	);
}
