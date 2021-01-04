import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import firebase from '@/firebase/clientApp';

export const UserContext = createContext(undefined);

export const useUser = () => useContext(UserContext);

const initialState = { isLoading: true };
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'getUserSuccess':
      return { ...action.payload, isLoading: false };
    case 'getUserFail':
      return null;
    case 'stopLoading':
      return { ...state, isLoading: false };
    default:
      throw new Error();
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { email, uid } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          dispatch({ type: 'getUserSuccess', payload: { email, uid } });
        } else {
          dispatch({ type: 'getUserFail' });
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        dispatch({ type: 'stopLoading' });
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
