import { Button, Grid } from '@material-ui/core';
import ResourceCard from 'components/resources/ResourceCard';
import ResourceDialog from 'components/resources/ResourceDialog';
import { useResources } from 'hooks/api';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { openAddResourceDialog } from 'store/resources';

export default function Resources() {
	const { data: resources, loading } = useResources();
	const dispatch = useDispatch();

	const onAddResource = () => {
		dispatch(openAddResourceDialog());
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
				</div>
				{loading ? (
					<div>Loading ....</div>
				) : resources?.length ? (
					<Grid container>
						{resources?.map(resource => (
							<Grid item xs={12} sm={6} md={4} key={resource.id} className="sm:px-4 mb-4">
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
		</>
	);
}
