import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

// The default exports is what Next will trigger,
// when the route is hit in the browser
export default function Home() {
	return (
		<div>
			<Link
				prefetch={false}
				href={{
					pathname: '/[username]',
					query: { username: 'justin123' },
				}}
			>
				<p>Justin Profile Page</p>
			</Link>
		</div>
	);
}
