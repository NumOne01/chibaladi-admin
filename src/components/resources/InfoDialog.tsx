import {
	AppBar,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Transition } from 'components/transition/Transition';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeResourceInfoDialog } from 'store/resources';

export default function InfoDialog() {
	const { open } = useSelector(
		(store: RootState) => store.resources.resourceInfoDialog
	);
	const dispatch = useDispatch();

	const handleCloseModal = () => {
		dispatch(closeResourceInfoDialog());
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseModal}
			maxWidth="sm"
			fullWidth
			keepMounted
			TransitionComponent={Transition}
		>
			<AppBar position="relative">
				<div className="flex items-center justify-between">
					<DialogTitle>راهنمای عکس ها</DialogTitle>
					<IconButton onClick={handleCloseModal} color="inherit" className="ml-2">
						<Close color="inherit" />
					</IconButton>
				</div>
			</AppBar>
			<DialogContent className="py-6">
				<h2 className="text-lg mb-3">صفحه اصلی</h2>
				<ul className="list-disc pr-4">
					<li className="mb-1">عکس اول : main-page-1</li>
					<li className="mb-1">عکس دوم : main-page-2</li>
					<li className="mb-1">عکس سوم : main-page-3</li>
					<li className="mb-1">عکس چهارم : main-page-4</li>
					<li className="mb-1">عکس پنجم : main-page-5</li>
					<li className="mb-1">عکس ششم : main-page-6</li>
				</ul>
			</DialogContent>
		</Dialog>
	);
}
