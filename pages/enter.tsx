import { auth, firestore, googleAuthProvider } from '@/lib/firebase';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '@/lib/context';
var debounce = require('lodash.debounce');

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

const UsernameForm = (): JSX.Element | null => {
	const [formValue, setFormValue] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const { user, username } = useContext(UserContext);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		// Create refs for both documents
		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		// Commit both docs together as a batch write.
		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameDoc, { uid: user.uid });

		await batch.commit();
	};

	const onChange = (e: any) => {
		// Force from value typed in form to match correct form
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	// Hit the database for username match after each debounced change
	// useCallback is required for debounce to work
	const checkUsername = useCallback(
		debounce(async (username: any) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log('Firestore read executed!');
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue, checkUsername]);

	if (!username) {
		return (
			<section>
				<h3>Choose Username</h3>
				<form action="" onSubmit={onSubmit}>
					<input
						name="username"
						placeholder="username"
						value={formValue}
						onChange={onChange}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<button type="submit" className="btn-green" disabled={!isValid}>
						Choose
					</button>

					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username Valid: {isValid.toString()}
					</div>
				</form>
			</section>
		);
	} else {
		return null;
	}
};

const UsernameMessage = ({
	username,
	isValid,
	loading,
}: {
	username: string;
	isValid: boolean;
	loading: boolean;
}): JSX.Element => {
	if (loading) {
		return <p>Checking...</p>;
	} else if (isValid) {
		return <p className="text-success">{username} is available!</p>;
	} else if (username && !isValid) {
		return <p className="text-danger">That username is taken!</p>;
	} else {
		return <p></p>;
	}
};

export default EnterPage;
