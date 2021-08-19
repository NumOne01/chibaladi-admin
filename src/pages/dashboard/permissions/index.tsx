import { Grid, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PermissionCard from 'components/permissions/PermissionCard';
import PermissionDialog from 'components/permissions/PermissionDialog';
import { useRequests } from 'hooks/api';
import { Helmet } from 'react-helmet';

export default function Permissions() {
	const { data: requests, loading } = useRequests();

	return (
		<>
			<Helmet>
				<title>دسترسی ها</title>
			</Helmet>
			<div className="mt-4">
				{loading ? (
					<Grid container>
						{Array.from(Array(3)).map((_, index) => (
							<Grid item key={index} xs={12} md={6} lg={4} xl={3} className="sm:px-4 mb-4">
								<Skeleton variant="rect" width="100%" height={348} />
							</Grid>
						))}
					</Grid>
				) : requests?.length ? (
					<Grid container>
						{requests?.map(request => (
							<Grid
								item
								xs={12}
								md={6}
								lg={4}
								xl={3}
								className="sm:px-4 mb-4"
								key={request.videoId + request.userId}
							>
								<Paper elevation={3}>
									<PermissionCard request={request} />
								</Paper>
							</Grid>
						))}
					</Grid>
				) : (
					<div className="text-xl text-center mt-40 text-gray-600">
						هیچ درخواستی وجود ندارد
					</div>
				)}
			</div>
			<PermissionDialog />
		</>
	);
}
