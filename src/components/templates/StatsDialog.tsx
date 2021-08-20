import {
	AppBar,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { getTemplateStats } from 'api/templates';
import { TemplateStats } from 'api/templates/models/TemplateStats';
import { Transition } from 'components/transition/Transition';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeStatsDialog } from 'store/templates';

export default function StatsDialog() {
	const { open, templateId } = useSelector(
		(store: RootState) => store.templates.statsDialog
	);

	const [loading, setLoading] = useState<boolean>(false);
	const [stats, setStats] = useState<TemplateStats | undefined>();

	useEffect(() => {
		const fetchStats = async () => {
			setLoading(true);
			const stats = await getTemplateStats(templateId);
			setStats(stats);
			setLoading(false);
		};
		templateId && fetchStats();
	}, [templateId]);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeStatsDialog());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			TransitionComponent={Transition}
		>
			<AppBar position="relative">
				<div className="flex justify-between pl-2 items-center">
					<DialogTitle>آمار آزمون</DialogTitle>
					<IconButton onClick={handleClose} color="inherit">
						<Close color="inherit" />
					</IconButton>
				</div>
			</AppBar>
			<DialogContent className="py-10">
				{(loading || !stats )? (
					Array.from(Array(6)).map((_, index) => (
						<Skeleton
							key={index}
							variant="text"
							width="200px"
							className="mb-2"
						/>
					))
				) : (
					<>
						<p className="mb-2">
							<span className="text-gray-700">تعداد کل دفعات شرکت شده</span> :{' '}
							<span>{stats?.totalAttempts}</span>
						</p>
						<p className="mb-2">
							<span className="text-gray-700">
								تعداد کل آزمون های تکمیل شده
							</span>{' '}
							: <span>{stats?.totalCompletedAttempts}</span>
						</p>
						<p className="mb-2">
							<span className="text-gray-700">امتیاز کامل</span> :{' '}
							<span>{stats?.fullScore}</span>
						</p>
						<p className="mb-2">
							<span className="text-gray-700">کمترین امتیاز</span> :{' '}
							<span>{stats?.minScore}</span>
						</p>
						<p className="mb-2">
							<span className="text-gray-700">بیشترین امتیاز</span> :{' '}
							<span>{stats?.maxScore}</span>
						</p>
						<p className="mb-2">
							<span className="text-gray-700">میانگین امتیاز</span> :{' '}
							<span>{stats?.averageScore}</span>
						</p>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
