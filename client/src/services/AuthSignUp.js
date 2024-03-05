import { useContext } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { useHttpClient } from '../hooks/useHttpClient';

export const AuthSignUp = () => {
  const auth = useContext(AuthContext);
  const {
    sendRequest,
    isSuccess: isSignUpSuccess,
    isPending: isSignUpPending,
    error: signUpError,
  } = useHttpClient();

  const signUp = async (inputValues) => {
    try {
      const result = await sendRequest(
        'http://localhost:8080/api/auth/signup',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify(inputValues)
      );

      auth.dispatch({ type: 'SIGN_UP', payload: result.user });
    } catch (err) {
      console.log(signUpError);
    }
  };

  return { signUp, isSignUpPending, isSignUpSuccess, signUpError };
};
