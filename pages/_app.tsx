import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// This App component wraps the rest of the components in the app
export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
