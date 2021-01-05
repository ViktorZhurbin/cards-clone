import { GenericObject } from '@/typings';
import { fetcher } from '@/utils/api/fetcher';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUser } from './User';

export const DecksContext = createContext(undefined);

export const useDecks = () => useContext(DecksContext);

export const DecksProvider = ({ children }) => {
  const DECKS_QUERY_KEY = 'decks';
  const user = useUser();
  const decksPath = user?.uid && `/api/${user.uid}/decks`;

  const { isLoading, isError, data, error } = useQuery(
    DECKS_QUERY_KEY,
    () => fetcher(decksPath),
    { enabled: !user.isLoading }
  );

  const queryClient = useQueryClient();

  const removeDeck = useMutation(
    (deckId) =>
      fetcher(`${decksPath}/${deckId}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: (data) => queryClient.setQueryData(DECKS_QUERY_KEY, data),
    }
  );
  const addDeck = useMutation(
    (body) =>
      fetcher(decksPath, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    {
      onSuccess: (data) => queryClient.setQueryData(DECKS_QUERY_KEY, data),
    }
  );

  const renameDeck = useMutation(
    (data: GenericObject) => {
      const { id, ...body } = data;
      return fetcher(`${decksPath}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    },
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
        renameDeck,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};
