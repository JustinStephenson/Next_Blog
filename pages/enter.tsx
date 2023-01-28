import { auth, googleAuthProvider } from '@/lib/firebase';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

type EnterProps = {};

const EnterPage = (props: EnterProps) => {
	const { user, username } = useContext(UserContext);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing username <UsernameForm />
	// 3. user signed in, has username <SignOutButton />
	return (
		<main>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
};

// Sign in with Google button
const SignInButton = () => {
	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(googleAuthProvider);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			<img src={'/google.png'} alt="google" /> Sign in with Google
		</button>
	);
};

// Sign out button
const SignOutButton = () => {
	const signOutWithGoogle = () => {
		auth.signOut();
	};

	return <button onClick={() => signOutWithGoogle()}>Sign Out</button>;
};

const UsernameForm = () => {
	return <></>;
};

export default EnterPage;
