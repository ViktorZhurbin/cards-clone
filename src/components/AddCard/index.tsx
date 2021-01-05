import { Editor } from '../Editor';
import styles from './AddCard.module.css';

export const AddCard = () => {
  return (
    <section className={styles.container}>
      <div className={styles.deckName}>Deck name</div>
      <div>
        <Editor />
      </div>
    </section>
  );
};
