import Head from 'next/head';
import Link from 'next/link';
import { useDecks } from '@/context/Decks';
import { useUser } from '@/context/User';
import styles from '../styles/Home.module.css';
import { DeckItem } from '@/components/DeckItem';

export default function Home() {
  const user = useUser();
  const { getDecks, addDeck, removeDeck, renameDeck } = useDecks();

  if (!user.uid && !user.isLoading) {
    return (
      <Link href="/auth">
        <a>Sign in</a>
      </Link>
    );
  }

  if (user.isLoading || getDecks.isLoading) {
    return <span>Loading...</span>;
  }

  if (getDecks.isError) {
    return <span>Error: {getDecks.error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Anki Clone</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.decks}>
          {getDecks.data.map(({ id, name }) => (
            <DeckItem
              key={id}
              id={id}
              name={name}
              onDelete={removeDeck.mutate}
              onRename={renameDeck.mutate}
            />
          ))}
        </section>
        <button
          className={styles.addDeckBtn}
          onClick={() =>
            addDeck.mutate({
              name: `Deck-${Math.floor(Math.random() * 100)}`,
            })
          }
        >
          Add Deck
        </button>
        <Link href="/card/add">
          <button className={styles.addCardBtn}>Add Card</button>
        </Link>
      </main>
    </div>
  );
}
