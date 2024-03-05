import { useHttpClient } from '../hooks/useHttpClient';

export const GettingProjectById = () => {
  const {
    sendRequest,
    isPending: isGettingProjectByIdPending,
    isSuccess: isGettingProjectByIdSuccess,
    error: gettingProjectByIdError,
  } = useHttpClient();

  const gettingProjectById = async (projectId) => {
    try {
      const result = await sendRequest(
        `http://localhost:8080/api/projects/${projectId}`
      );

      return result;
    } catch (err) {
      console.log({
        err,
        gettingProjectByIdError,
      });
    }
  };

  return {
    gettingProjectById,
    isGettingProjectByIdPending,
    isGettingProjectByIdSuccess,
    gettingProjectByIdError,
  };
};
