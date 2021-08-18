import { NavigationItem } from './NavigationItem';
import LiveHelp from '@material-ui/icons/LiveHelp';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Videocam from '@material-ui/icons/Videocam';
import { Category, Person, PhotoSizeSelectActual, Traffic } from '@material-ui/icons';

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
		text: 'ویدیو ها',
		link: 'videos',
		icon: Videocam
	},
	{
		text: 'دسترسی ها',
		link: 'permissions',
		icon: Traffic
	},
	{
		text: 'عکس ها',
		link: 'resources',
		icon: PhotoSizeSelectActual
	},
	{
		text: 'کاربران',
		link: 'users',
		icon: Person
	},
	{
		text: 'خروج',
		link: 'logout',
		icon: ExitToApp
	}
];

export default routes;
