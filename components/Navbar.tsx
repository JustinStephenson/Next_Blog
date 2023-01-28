import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
	const { user, username } = useContext(UserContext);

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button className="btn-logo">FEED</button>
					</Link>
				</li>

				{/* user is signed-in AND has username */}
				{username && (
					<>
						{/* Link to admin page */}
						<li className="push-left">
							<Link href="/admin">
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						{/* Link to profile page */}
						<li>
							<Link href={`/${username}`}>
								<img src={user?.photoURL} alt="photo-URL" />
							</Link>
						</li>
					</>
				)}

				{/* user is not signed-in OR has not created username */}
				{!username && (
					<>
						{/* Link to enter/sign-in page */}
						<li>
							<Link href="/enter">
								<button className="btn-blue">Log in</button>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
