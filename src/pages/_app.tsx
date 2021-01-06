import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '@/context/User';
import { DecksProvider } from '@/context/Decks';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <DecksProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </DecksProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
