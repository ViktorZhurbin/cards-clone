import { fetcher } from '@/utils/api/fetcher';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUser } from './User';

export const DecksContext = createContext(undefined);

export const useDecks = () => useContext(DecksContext);

export const DecksProvider = ({ children }) => {
  const DECKS_QUERY_KEY = 'decks';
  const user = useUser();
  const path = user?.uid && `/api/decks?uid=${user.uid}`;

  const { isLoading, isError, data, error } = useQuery(
    DECKS_QUERY_KEY,
    () => fetcher(path),
    { enabled: !user.isLoading }
  );

  const queryClient = useQueryClient();

  const removeDeck = useMutation(
    (id) =>
      fetcher(`${path}&deckId=${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: (data) => queryClient.setQueryData(DECKS_QUERY_KEY, data),
    }
  );
  const addDeck = useMutation(
    (name) =>
      fetcher(`${path}&name=${name}`, {
        method: 'POST',
      }),
    {
      onSuccess: (data) => queryClient.setQueryData(DECKS_QUERY_KEY, data),
    }
  );

  return (
    <DecksContext.Provider
      value={{
        getDecks: { isLoading, isError, data, error },
        addDeck,
        removeDeck,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};
