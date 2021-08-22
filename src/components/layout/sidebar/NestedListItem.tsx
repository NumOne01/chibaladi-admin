import {
	Collapse,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SvgIcon
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';

interface Props {
	navItem: NavigationItem;
	url: string;
}

export default function NestedListItem({ navItem, url }: Props) {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<SvgIcon component={navItem.icon} />
				</ListItemIcon>
				<ListItemText primary={navItem.text} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{navItem.children?.map(route => (
						<NavLink
							key={route.link}
							to={`${url}/${navItem.link}${route.link}`}
							activeClassName="block bg-gray-200"
						>
							<ListItem button className="pr-12">
								<ListItemText primary={route.text} />
							</ListItem>
						</NavLink>
					))}
				</List>
			</Collapse>
		</>
	);
}
