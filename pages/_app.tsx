import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// This App component wraps the rest of the components in the app
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</>
	);
}
