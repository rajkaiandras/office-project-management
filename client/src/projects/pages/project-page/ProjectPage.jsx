import { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import { GettingProjectById } from '../../../services/GettingProjectById.js';

import { LoadingSpinner } from '../../../shared/components/UIElements/LoadingSpinner.jsx';
import { ErrMessage } from '../../../shared/components/UIElements/ErrMessage.jsx';
import { ProjectPageSideNav } from '../../components/ProjectPageSideNav.jsx';

export const ProjectPage = () => {
  const [projectData, setProjectData] = useState();
  const projectId = useParams();
  const {
    gettingProjectById,
    isGettingProjectByIdPending,
    isGettingProjectByIdSuccess,
    gettingProjectByIdError,
  } = GettingProjectById();

  useEffect(() => {
    const getProjectData = async () => {
      const projectById = await gettingProjectById(projectId.pid);

      setProjectData(projectById);
    };

    getProjectData();
  }, [projectId]);

  return (
    <section className="grid grid-cols-12 grid-rows-1 gap-x-4">
      {isGettingProjectByIdSuccess && (
        <ProjectPageSideNav projectData={projectData} />
      )}

      <Outlet context={projectData} />

      {isGettingProjectByIdPending && <LoadingSpinner />}
      {gettingProjectByIdError && (
        <ErrMessage message={gettingProjectByIdError} />
      )}
    </section>
  );
};
