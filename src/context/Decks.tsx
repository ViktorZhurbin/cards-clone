import { fetcher } from '@/utils/api/fetcher';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUser } from './User';

export const DecksContext = createContext(undefined);

export const useDecks = () => useContext(DecksContext);

export const DecksProvider = ({ children }) => {
  const user = useUser();
  const basePath = '/api/decks';
  const path = user?.uid && `${basePath}?uid=${user.uid}`;

  const { isLoading, isError, data, error } = useQuery(
    'decks',
    () => fetcher(path),
    { enabled: !user.isLoading }
  );

  const queryClient = useQueryClient();

  const removeDeck = useMutation(
    (id) => fetcher(`${path}&deckId=${id}`, { method: 'DELETE' }),
    {
      onSuccess: (data) => queryClient.setQueryData('decks', data),
    }
  );
  const addDeck = useMutation(
    (name) =>
      fetcher(`${path}&name=${name}`, {
        method: 'POST',
      }),
    {
      onSuccess: (data) => queryClient.setQueryData('decks', data),
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
