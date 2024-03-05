import { useHttpClient } from '../hooks/useHttpClient';

export const UpdateProjectRequest = () => {
  const {
    sendRequest,
    isSuccess: isUpdateProjectRequestSuccess,
    isPending: isUpdateProjectRequestPending,
    error: updateProjectRequestError,
  } = useHttpClient();

  const updateProject = async (projectId, issues) => {
    try {
      const result = await sendRequest(
        `http://localhost:8080/api/projects/${projectId}`,
        'PATCH',
        { 'Content-Type': 'application/json' },
        JSON.stringify({ issues })
      );

      return result;
    } catch (err) {
      console.log(updateProjectRequestError);
    }
  };

  return {
    updateProject,
    isUpdateProjectRequestPending,
    isUpdateProjectRequestSuccess,
    updateProjectRequestError,
  };
};
