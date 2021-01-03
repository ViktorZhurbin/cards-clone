import Head from 'next/head';
import Link from 'next/link';
import { useDecks } from '@/context/Decks';
import { useUser } from '@/context/User';
import styles from '../styles/Home.module.css';
import { DeckItem } from '@/components/DeckItem';

export default function Home() {
  const { user, loadingUser } = useUser();
  const { data: decks, isLoading: loadingDecks, isError, error } = useDecks();

  if (!user && !loadingUser) {
    return (
      <Link href="/auth">
        <a>Sign in</a>
      </Link>
    );
  }

  if (loadingUser || loadingDecks) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Anki Clone</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.decks}>
          {decks.map(({ id, name }) => (
            <DeckItem key={id} name={name} />
          ))}
        </section>
        <button
          onClick={() => {
            fetch('/api/deck/add', {
              method: 'POST',
              body: JSON.stringify({ uid: user.uid, name: 'ddeck2' }),
            });
          }}
        >
          Add
        </button>
      </main>
    </div>
  );
}
