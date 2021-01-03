import styles from './DeckItem.module.css';

export const DeckItem = ({ name }) => {
  return (
    <div className={styles.deckItem}>
      <span className={styles.name}>{name}</span>
      <div className={styles.actions}>
        <span>Rename</span>
        <span>Delete</span>
      </div>
    </div>
  );
};
