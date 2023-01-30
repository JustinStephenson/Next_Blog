import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';

export const useUserData = () => {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState<any>(null);

	useEffect(() => {
		// used to turn of realtime subscription
		let unsubscribe: () => void = () => {};

		if (user) {
			const ref = firestore.collection('users').doc(user.uid);
			unsubscribe = ref.onSnapshot((doc) => {
				setUsername(doc.data()?.username);
			});
		} else {
			setUsername(null);
		}

		return unsubscribe;
	}, [user]);

	return { user, username };
};
