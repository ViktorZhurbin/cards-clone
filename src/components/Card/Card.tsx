import { useDecks } from '@/context/Decks';
import { useState } from 'react';
import { TextArea } from '../TextArea';
import styles from './Card.module.css';

export const Card = ({ initialState = '' }) => {
  const { decks } = useDecks();
  const [text, setText] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let values = {};
    for (let [key, value] of formData.entries()) {
      values[key] = value;
    }

    console.log(values);
  };

  if (!decks.data || decks.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.deckName}>
        <label>
          Deck:
          <select name="deck" defaultValue={decks.data[0].id}>
            {decks.data.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        Text:
        <TextArea name="text" value={text} onChange={setText} rows={10} />
      </div>
      <input type="submit" />
    </form>
  );
};
