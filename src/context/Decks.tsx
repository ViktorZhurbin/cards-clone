import { createContext, useEffect, useState } from 'react';

import firebase from '@/firebase/clientApp';

export const DecksContext = createContext(undefined);

export const DecksProvider = ({ children }) => {
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (decks) {
      if (decks) {
        const { email, uid } = decks;
        setDecks({ email, uid });
      }
    });
  }, []);

  return (
    <DecksContext.Provider value={decks}>{children}</DecksContext.Provider>
  );
};
