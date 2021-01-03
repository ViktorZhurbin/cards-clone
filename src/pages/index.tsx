import { useUser } from '@/context/User';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { user, loadingUser } = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <button
          onClick={() => {
            if (!loadingUser) {
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
            if (!loadingUser) {
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
