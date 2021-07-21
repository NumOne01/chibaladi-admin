export interface LoginForm {
	username: string;
	password: string;
	scope: 'webclient';
	grant_type: 'password';
}
