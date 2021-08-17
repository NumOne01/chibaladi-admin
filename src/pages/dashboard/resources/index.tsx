import { Button } from '@material-ui/core';
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
				<div>
					<Button onClick={onAddResource} color="primary" variant="contained">
						عکس جدید
					</Button>
				</div>
				{loading ? (
					<div>Loading ....</div>
				) : resources?.length ? (
					resources?.map(resource => (
						<div key={resource.id}>{resource.name}</div>
					))
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
