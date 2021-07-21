import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactChild } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Paper from '@material-ui/core/Paper';

export const drawerWidth = 240;

interface Props {
	children: ReactChild;
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		position: 'relative',
		minHeight: '100%'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	background: {
		backgroundColor: theme.palette.primary.main,
		height: '40%',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: -1
	}
}));

export default function MiniDrawer({ children }: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Header open={open} handleDrawerOpen={handleDrawerOpen} />
			<Sidebar open={open} handleDrawerClose={handleDrawerClose} />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div className={classes.background}></div>
				<Paper>{children}</Paper>
			</main>
		</div>
	);
}
