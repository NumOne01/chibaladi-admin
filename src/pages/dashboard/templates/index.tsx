import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddTemplateDialog from 'components/templates/AddTemplateDialog';
import TemplateCard from 'components/templates/TemplateCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchCategories } from 'store/categories';
import { fetchTemplates, openAddTemplateDialog } from 'store/templates';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Templates() {
	const dispatch = useDispatch();

	const { entities: templates, loading: templatesLoading } = useSelector(
		(store: RootState) => store.templates
	);

	const { entities: categories, loading: cateogiesLoading } = useSelector(
		(store: RootState) => store.categories
	);

	const onAddTemplate = () => {
		dispatch(openAddTemplateDialog());
	};

	useEffect(() => {
		if (templates.length === 0) dispatch(fetchTemplates());
		if (categories.length === 0) dispatch(fetchCategories());
	}, []);

	return (
		<>
			<div>
				<div className="mb-6 pr-2">
					<Button color="primary" variant="contained" onClick={onAddTemplate}>
						آزمون جدید
					</Button>
				</div>
				{cateogiesLoading || templatesLoading ? (
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
						{templates.map(template => (
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
		</>
	);
}
