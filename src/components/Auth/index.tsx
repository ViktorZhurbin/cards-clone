import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '@/utils/auth/initFirebase';

// Init the Firebase app.
initFirebase();

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console. Use the same OAuth client ID used for the Google provider
      // configured with GCIP or Firebase Auth.
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => true,
  },
};

export const Auth = () => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};
