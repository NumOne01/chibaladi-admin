export interface NavigationItem {
	text: string;
	link: string;
	icon: any;
	nested?: boolean;
	children?: NavigationItem[]
}
