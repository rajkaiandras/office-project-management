import { useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';

export const GettingProjects = () => {
  const {
    sendRequest,
    isPending: isGettingProjectsPending,
    isSuccess: isGettingProjectsSuccess,
    error: gettingProjectsError,
  } = useHttpClient();
  const [projects, setProjects] = useState();

  useEffect(() => {
    const gettingProjects = async () => {
      try {
        const result = await sendRequest('http://localhost:8080/api/projects');

        setProjects(result);
      } catch (err) {
        console.log({
          err,
          gettingProjectsError,
        });
      }
    };

    gettingProjects();
  }, []);

  return {
    projects,
    isGettingProjectsPending,
    isGettingProjectsSuccess,
    gettingProjectsError,
  };
};
