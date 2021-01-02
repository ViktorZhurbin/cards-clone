import { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import initFirebase from '@/utils/auth/initFirebase';

export const UserContext = createContext(undefined);
initFirebase();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const { email, uid } = user;
        setUser({ email, uid });
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
