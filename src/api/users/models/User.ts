import { Role } from "./Role";

export interface User {
	id: 0;
	username: string;
	firstName: string;
	lastName: string;
	mobile: string;
	email: string;
	birthDate: string;
	roles: Role[];
}
