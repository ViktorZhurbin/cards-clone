import Head from 'next/head';
import Link from 'next/link';
import { useDecks } from '@/context/Decks';
import { useUser } from '@/context/User';
import styles from '../styles/Home.module.css';
import { DeckItem } from '@/components/DeckItem';

export default function Home() {
  const user = useUser();
  const decks = useDecks();

  if (!user.uid && !user.isLoading) {
    return (
      <Link href="/auth">
        <a>Sign in</a>
      </Link>
    );
  }

  if (user.isLoading || decks.isLoading) {
    return <span>Loading...</span>;
  }

  if (decks.isError) {
    return <span>Error: {decks.error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Anki Clone</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.decks}>
          {decks.data.map(({ id, name }) => (
            <DeckItem
              key={id}
              name={name}
              onDelete={() => decks.deleteDeck(id)}
            />
          ))}
        </section>
        <button
          onClick={() => {
            fetch('/api/decks/add', {
              method: 'POST',
              body: JSON.stringify({ uid: user.uid, name: 'deck2' }),
            });
          }}
        >
          Add
        </button>
      </main>
    </div>
  );
}
