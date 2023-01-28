import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

import Loader from '@/components/Loader';
import toast from 'react-hot-toast';

// The default exports is what Next will trigger,
// when the route is hit in the browser
export default function Home() {
	return (
		<div>
			<Loader show />
			<Link
				prefetch={false}
				href={{
					pathname: '/[username]',
					query: { username: 'justin123' },
				}}
			>
				<p>Justin Profile Page</p>
			</Link>

			<button onClick={() => toast.success('Hello toast!')}>Toast Me</button>
		</div>
	);
}
