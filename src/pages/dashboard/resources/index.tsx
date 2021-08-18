import { Button, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import InfoDialog from 'components/resources/InfoDialog';
import ResourceCard from 'components/resources/ResourceCard';
import ResourceDialog from 'components/resources/ResourceDialog';
import { useResources } from 'hooks/api';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { openAddResourceDialog, openResourceInfoDialog } from 'store/resources';

export default function Resources() {
	const { data: resources, loading } = useResources();
	const dispatch = useDispatch();

	const onAddResource = () => {
		dispatch(openAddResourceDialog());
	};

	const onOpenInfoDialog = () => {
		dispatch(openResourceInfoDialog());
	};

	return (
		<>
			<Helmet>
				<title>عکس ها</title>
			</Helmet>
			<div>
				<div className="mb-8 sm:pr-4 pt-4">
					<Button onClick={onAddResource} color="primary" variant="contained">
						عکس جدید
					</Button>
					<Button
						color="primary"
						variant="outlined"
						onClick={onOpenInfoDialog}
						className="mr-3"
					>
						راهنمای عکس ها
					</Button>
				</div>
				{loading ? (
					<Grid container>
						{Array.from(Array(3)).map((_, index) => (
							<Grid item xs={12} sm={6} md={4} key={index} className="sm:px-4 mb-8">
								<Skeleton
									
									variant="rect"
									width="100%"
									height={200}
								/>
							</Grid>
						))}
					</Grid>
				) : resources?.length ? (
					<Grid container>
						{resources?.map(resource => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={resource.id}
								className="sm:px-4 mb-8"
							>
								<ResourceCard resourse={resource} />
							</Grid>
						))}
					</Grid>
				) : (
					<div className="text-2xl text-gray-600 flex items-center justify-center mt-20 md:mt-40">
						هیچ عکسی وجود ندارد
					</div>
				)}
			</div>
			<ResourceDialog />
			<InfoDialog />
		</>
	);
}
