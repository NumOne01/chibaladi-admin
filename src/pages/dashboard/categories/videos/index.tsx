import Skeleton from '@material-ui/lab/Skeleton';
import CategoryRow from 'components/categories/CategoryRow';
import { useVideoCategories } from 'hooks/api';

export default function VideoCategories() {
	const { data: categories, loading } = useVideoCategories();

	return (
		<div className="sm:p-4">
			{loading
				? Array.from(Array(4)).map((_, index) => (
						<Skeleton
							key={index}
							variant="rect"
							height={72}
							width="100%"
							className="mb-2"
						/>
				  ))
				: categories?.map(category => (
						<CategoryRow hasDelete key={category.id} category={category} />
				  ))}
		</div>
	);
}
