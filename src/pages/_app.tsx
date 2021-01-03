import '../styles/globals.css';
import { AppProps } from 'next/app';
import { UserProvider } from '@/context/User';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
