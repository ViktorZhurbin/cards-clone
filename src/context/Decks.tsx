import { fetcher } from '@/utils/api/fetcher';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useUser } from './User';

export const DecksContext = createContext(undefined);

export const useDecks = () => useContext(DecksContext);

export const DecksProvider = ({ children }) => {
  const { user, loadingUser } = useUser();
  const { isLoading, isError, data, error } = useQuery(
    ['decks', user?.uid],
    () => fetcher('/api/decks/' + user.uid),
    { enabled: !loadingUser }
  );

  return (
    <DecksContext.Provider value={{ isLoading, isError, data, error }}>
      {children}
    </DecksContext.Provider>
  );
};
