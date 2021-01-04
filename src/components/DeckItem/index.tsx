import { useMutation, useQuery } from 'react-query';
import styles from './DeckItem.module.css';

export const DeckItem = ({ id, name, onDelete, onRename }) => {
  const handleRename = () => {
    const newName = prompt('New name', name);
    newName && onRename({ id, newName });
  };

  return (
    <div className={styles.deckItem}>
      <span className={styles.name}>{name}</span>
      <div className={styles.actions}>
        <span onClick={handleRename}>Rename</span>
        <span onClick={() => onDelete(id)}>Delete</span>
      </div>
    </div>
  );
};
