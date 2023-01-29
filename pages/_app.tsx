import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';

// This App component wraps the rest of the components in the app
export default function App({ Component, pageProps }: AppProps) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</UserContext.Provider>
	);
}
