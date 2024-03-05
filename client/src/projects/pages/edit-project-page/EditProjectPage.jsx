import { useOutletContext } from 'react-router-dom';

import { CreateProjectPage } from '../create-project-page/CreateProjectPage';

export const EditProjectPage = () => {
  const projectData = useOutletContext();

  return (
    <CreateProjectPage
      editMode={{ isActive: true, projectData: projectData }}
    />
  );
};
