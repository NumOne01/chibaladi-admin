import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ReactChild } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { Paper } from '@material-ui/core';

export const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		overflowX: 'hidden',
		minHeight: '100%',
		position: 'relative'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: drawerWidth
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

interface Props {
	children: ReactChild;
}

export default function MiniDrawer({ children }: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Header open={open} handleDrawerOpen={handleDrawerOpen} />
			<div className={classes.background}></div>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.toolbar} />
				<Paper>{children}</Paper>
			</main>
			<Sidebar open={open} handleDrawerClose={handleDrawerClose} />
		</div>
	);
}
