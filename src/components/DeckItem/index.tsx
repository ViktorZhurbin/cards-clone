import { useMutation, useQuery } from 'react-query';
import styles from './DeckItem.module.css';

export const DeckItem = ({ name, onDelete }) => {
  return (
    <div className={styles.deckItem}>
      <span className={styles.name}>{name}</span>
      <div className={styles.actions}>
        <span onClick={() => null}>Rename</span>
        <span onClick={onDelete}>Delete</span>
      </div>
    </div>
  );
};
