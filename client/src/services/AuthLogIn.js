import { useContext } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { useHttpClient } from '../hooks/useHttpClient';

export const AuthLogIn = () => {
  const auth = useContext(AuthContext);
  const {
    sendRequest,
    isSuccess: isLogInSuccess,
    isPending: isLogInPending,
    error: logInError,
  } = useHttpClient();

  const logIn = async (inputValues) => {
    try {
      const responseData = await sendRequest(
        'http://localhost:8080/api/auth/login',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify(inputValues)
      );

      auth.dispatch({ type: 'LOG_IN', payload: responseData.user });
    } catch (err) {
      console.log(logInError);
    }
  };

  return { logIn, isLogInPending, isLogInSuccess, logInError };
};
