import { NavigationItem } from './NavigationItem';
import LiveHelp from '@material-ui/icons/LiveHelp';
import ExitToApp from '@material-ui/icons/ExitToApp';

const routes: NavigationItem[] = [
	{
		text: 'آزمون ها',
		link: 'templates',
		icon: LiveHelp
	},
	{
		text: 'خروج',
		link: 'logout',
		icon: ExitToApp
	}
];

export default routes;
