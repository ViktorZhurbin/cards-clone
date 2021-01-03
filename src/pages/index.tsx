import { UserContext } from '@/contexts/User';
import Head from 'next/head';
import { useContext } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <button
          onClick={() => {
            if (user) {
              fetch('/api/deck/add', {
                method: 'POST',
                body: JSON.stringify({ uid: user.uid, name: 'ddeck2' }),
              });
            }
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            if (user) {
              fetch('/api/deck/' + user.uid);
            }
          }}
        >
          Get
        </button>
      </main>
    </div>
  );
}
