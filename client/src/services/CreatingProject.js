import { useContext } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';
import { AuthContext } from '../contexts/auth-context.jsx';

export const CreatingProject = () => {
  const auth = useContext(AuthContext);
  const {
    sendRequest,
    isSuccess: isCreatingProjectSuccess,
    isPending: isCreatingProjectPending,
    error: creatingProjectError,
  } = useHttpClient();

  const creatingProject = async (inputValues) => {
    try {
      const result = await sendRequest(
        'http://localhost:8080/api/projects/create',
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.state.user.token,
        },
        JSON.stringify(inputValues)
      );

      return result;
    } catch (err) {
      console.log(creatingProjectError);
    }
  };

  return {
    creatingProject,
    isCreatingProjectPending,
    isCreatingProjectSuccess,
    creatingProjectError,
  };
};
