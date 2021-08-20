import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeStatsDialog } from 'store/templates';

export default function StatsDialog() {
	const { open, templateId } = useSelector(
		(store: RootState) => store.templates.statsDialog
	);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeStatsDialog());
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			Stats
		</Dialog>
	);
}
