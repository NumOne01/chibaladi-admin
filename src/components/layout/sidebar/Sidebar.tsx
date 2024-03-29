import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import { drawerWidth } from '../Layout';
import routes from './routes';
import { NavLink, useRouteMatch } from 'react-router-dom';
import NestedListItem from './NestedListItem';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(8) + 1
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	}
}));

interface Props {
	handleDrawerClose: () => void;
	open: boolean;
}

export default function Sidebar({ handleDrawerClose, open }: Props) {
	const classes = useStyles();
	const { url, path } = useRouteMatch();

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronRightIcon />
				</IconButton>
			</div>
			<Divider />
			<List className="pt-0">
				{routes.map(route => (
					<>
						{route.nested ? (
							<NestedListItem url={url} navItem={route} />
						) : (
							<NavLink
								to={`${url}/${route.link}`}
								key={route.text}
								className="block"
								activeClassName="bg-gray-200"
							>
								<ListItem button>
									<ListItemIcon>
										<SvgIcon component={route.icon} />
									</ListItemIcon>
									<ListItemText primary={route.text} />
								</ListItem>
							</NavLink>
						)}
						<Divider />
					</>
				))}
			</List>
		</Drawer>
	);
}
