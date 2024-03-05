import { GettingProjects } from '../../services/GettingProjects';

import { DashboardProjectItem } from '../components/DashboardProjectItem';
import { SectionTitle } from '../../shared/components/UIElements/SectionTitle';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { ErrMessage } from '../../shared/components/UIElements/ErrMessage';

export const DashboardProjectsList = () => {
  const {
    projects,
    isGettingProjectsPending,
    isGettingProjectsSuccess,
    gettingProjectsError,
  } = GettingProjects();

  return (
    <section>
      <SectionTitle title={'All Projects'} />

      <section className="flex flex-wrap justify-start w-full">
        {isGettingProjectsSuccess &&
          projects.map((project) => (
            <DashboardProjectItem key={project._id} projectData={project} />
          ))}

        {isGettingProjectsPending && <LoadingSpinner />}
        {gettingProjectsError && <ErrMessage message={gettingProjectsError} />}
      </section>
    </section>
  );
};
