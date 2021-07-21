import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from 'store/auth';

export default function Logout() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(logout());
		history.replace('/login');
	}, []);
	return null;
}
