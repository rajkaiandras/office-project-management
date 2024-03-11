import { useContext } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';
import { AuthContext } from '../contexts/auth-context.jsx';

export const UpdateProjectRequest = () => {
  const auth = useContext(AuthContext);
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
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.state.user.token,
        },
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
