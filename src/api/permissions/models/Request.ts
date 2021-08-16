export interface Request {
	requested: boolean;
	granted: boolean;
	hasPermission: boolean;
	permissionRequestedDate: string;
	permissionGrantedDate: string;
	expirationDate: string;
	userId: string;
	videoId: string;
}
