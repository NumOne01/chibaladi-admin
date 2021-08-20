import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddTemplateDialog from 'components/templates/AddTemplateDialog';
import TemplateCard from 'components/templates/TemplateCard';
import { useDispatch } from 'react-redux';
import { openAddTemplateDialog } from 'store/templates';
import Skeleton from '@material-ui/lab/Skeleton';
import { useCategories, useTemplates } from 'hooks/api';
import { Helmet } from 'react-helmet';
import StatsDialog from 'components/templates/StatsDialog';

export default function Templates() {
	const dispatch = useDispatch();
	const { data: templates, loading: templatesLoading } = useTemplates();
	const { loading: categoriesLoading } = useCategories();

	const onAddTemplate = () => {
		dispatch(openAddTemplateDialog());
	};

	return (
		<>
			<Helmet>
				<title>آزمون ها</title>
			</Helmet>
			<div>
				<div className="mb-6 pr-2">
					<Button color="primary" variant="contained" onClick={onAddTemplate}>
						آزمون جدید
					</Button>
				</div>
				{categoriesLoading || templatesLoading ? (
					<Grid container>
						{Array.from(Array(4)).map((_, index) => (
							<Grid
								item
								key={index}
								xs={12}
								md={4}
								lg={3}
								sm={6}
								className="mb-4 px-2"
							>
								<Skeleton variant="rect" height={184} />
							</Grid>
						))}
					</Grid>
				) : (
					<Grid container>
						{templates?.map(template => (
							<Grid
								item
								key={template.id}
								xs={12}
								md={4}
								lg={3}
								sm={6}
								className="mb-4"
							>
								<TemplateCard template={template} />
							</Grid>
						))}
					</Grid>
				)}
			</div>
			<AddTemplateDialog />
			<StatsDialog />
		</>
	);
}
