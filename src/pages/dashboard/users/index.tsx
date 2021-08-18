import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import UserCard from 'components/users/UserCard';
import UserDialog from 'components/users/UserDialog';
import { useUsers } from 'hooks/api';
import { Helmet } from 'react-helmet';

export default function Users() {
	const { data: users, loading } = useUsers();

	return (
		<>
			<Helmet>
				<title>کاربران</title>
			</Helmet>
			<div className="mt-4">
				{loading ? (
					<Grid container>
						{Array.from(Array(3)).map((_, index) => (
							<Grid
								item
								key={index}
								xs={12}
								sm={6}
								md={4}
								lg={3}
								className="sm:px-4 mb-8"
							>
								<Skeleton variant="rect" width="100%" height={250} />
							</Grid>
						))}
					</Grid>
				) : (
					<Grid container>
						{users?.map(user => (
							<Grid
								key={user.id}
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								className="sm:px-4 mb-8"
							>
								<UserCard user={user} />
							</Grid>
						))}
					</Grid>
				)}
			</div>
			<UserDialog />
		</>
	);
}
