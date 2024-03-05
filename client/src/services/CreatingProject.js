import { useHttpClient } from '../hooks/useHttpClient';

export const CreatingProject = () => {
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
        { 'Content-Type': 'application/json' },
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
