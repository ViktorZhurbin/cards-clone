import { fetcher } from '@/utils/api/fetcher';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUser } from './User';

export const DecksContext = createContext(undefined);

export const useDecks = () => useContext(DecksContext);

export const DecksProvider = ({ children }) => {
  const user = useUser();
  const path = user?.uid && `/api/decks?uid=${user.uid}`;

  const { isLoading, isError, data, error } = useQuery(
    'decks',
    () => fetcher(path),
    { enabled: !user.isLoading }
  );

  const queryClient = useQueryClient();

  const { mutate: deleteDeck } = useMutation(
    (id) => fetcher(`${path}&deckId=${id}`, { method: 'DELETE' }),
    {
      onSuccess: (data) => queryClient.setQueryData('decks', data),
    }
  );

  return (
    <DecksContext.Provider
      value={{ isLoading, isError, data, error, deleteDeck }}
    >
      {children}
    </DecksContext.Provider>
  );
};
