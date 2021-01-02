import { Auth as FirebaseAuth } from '@/components/Auth';

const Auth = () => {
  return (
    <div>
      <p>Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
