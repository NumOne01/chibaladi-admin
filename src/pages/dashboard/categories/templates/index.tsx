import { Button } from '@material-ui/core';
import AddCategoryDialog from 'components/categories/AddCategoryDialog';
import CategoryRow from 'components/categories/CategoryRow';
import { useCategories } from 'hooks/api';
import { useDispatch } from 'react-redux';
import { openAddCategoryDialog } from 'store/categories';
import { Helmet } from 'react-helmet';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Categories() {
	const dispatch = useDispatch();
	const { data: categories, loading } = useCategories();

	const handleAddCategory = () => {
		dispatch(openAddCategoryDialog(''));
	};

	return (
		<>
			<Helmet>
				<title>دسته بندی ها</title>
			</Helmet>
			<div>
				<div className="mb-6 pr-2">
					<Button
						color="primary"
						variant="contained"
						onClick={handleAddCategory}
					>
						دسته بندی جدید
					</Button>
				</div>
				<div className="md:px-20">
					{loading
						? Array.from(Array(4)).map((_, index) => (
								<Skeleton
									key={index}
									variant="rect"
									height={52}
									width="100%"
									className="mb-2"
								/>
						  ))
						: categories?.map(category => (
								<CategoryRow category={category} key={category.id} />
						  ))}
				</div>
			</div>

			<AddCategoryDialog />
		</>
	);
}
