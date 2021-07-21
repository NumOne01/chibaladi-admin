import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function LazyProgressbar() {
	useEffect(() => {
		NProgress.start();

		return () => {
			NProgress.done();
		};
	}, []);
	return null;
}
