import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Component's children only shown to logged-in users
function AuthCheck(props: any) {
	const { username } = useContext(UserContext);

	return username
		? props.children
		: props.fallback || <Link href="/enter">You must be signed in</Link>;
}

export default AuthCheck;
