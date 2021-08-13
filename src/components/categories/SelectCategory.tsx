import { TextField } from '@material-ui/core';
import Autocomplete, {
	createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { Category } from 'api/categories/models/Category';
import { useCategories } from 'hooks/api';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openAddCategoryDialog } from 'store/categories';

interface CategoryType extends Category {
	inputValue?: string;
}

interface Props {
	onChange: (newValue: CategoryType | null) => void;
	error: string | undefined;
	touched: boolean;
	defaultValue?: string;
}

const filter = createFilterOptions<CategoryType>();

export default function SelectCategory({
	error,
	onChange,
	touched,
	defaultValue
}: Props) {
	const history = useHistory();
	const dispatch = useDispatch();

	let { data: categoriesData } = useCategories();
	const categories = categoriesData?.map<CategoryType>(category => ({
		...category,
		inputValue: ''
	}));

	return (
		<Autocomplete
			onChange={async (event, newValue) => {
				if (newValue && newValue.inputValue) {
					history.push('/dashboard/categories');
					dispatch(openAddCategoryDialog(newValue.inputValue));
				} else {
					onChange(newValue);
				}
			}}
			defaultValue={categories?.find(
				category => category.name === defaultValue
			)}
			noOptionsText={'دسته بندی وجود ندارد'}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				// Suggest the creation of a new value
				if (params.inputValue !== '') {
					filtered.push({
						inputValue: params.inputValue,
						name: `اضافه کردن دسته بندی "${params.inputValue}"`,
						id: '',
						details: ''
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			loadingText="لطفا منتظر بمانید ..."
			fullWidth
			handleHomeEndKeys
			options={categories || []}
			className="mb-4"
			getOptionLabel={option => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.name;
			}}
			renderOption={option => option.name}
			renderInput={params => (
				<TextField
					{...params}
					name="category"
					label="دسته بندی"
					error={touched && Boolean(error)}
					helperText={touched && Boolean(error) ? error : ''}
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: params.InputProps.endAdornment
					}}
				/>
			)}
		/>
	);
}
