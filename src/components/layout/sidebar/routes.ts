import { NavigationItem } from './NavigationItem';
import LiveHelp from '@material-ui/icons/LiveHelp';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Category } from '@material-ui/icons';

const routes: NavigationItem[] = [
	{
		text: 'آزمون ها',
		link: 'templates',
		icon: LiveHelp
	},
	{
		text: 'دسته بندی ها',
		link: 'categories',
		icon: Category
	},
	{
		text: 'خروج',
		link: 'logout',
		icon: ExitToApp
	}
];

export default routes;
