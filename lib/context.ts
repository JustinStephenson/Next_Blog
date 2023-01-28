import { createContext } from 'react';

const userObject = {
	user: <any>null,
	username: <any>null,
};

export const UserContext = createContext(userObject);
