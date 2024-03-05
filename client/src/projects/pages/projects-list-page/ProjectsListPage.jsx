import { GettingProjects } from '../../../services/GettingProjects';
import { ProjectsListItem } from '../../components/ProjectsListItem';

import { LoadingSpinner } from '../../../shared/components/UIElements/LoadingSpinner';
import { ErrMessage } from '../../../shared/components/UIElements/ErrMessage';

export const ProjectsListPage = () => {
  const {
    projects,
    isGettingProjectsPending,
    isGettingProjectsSuccess,
    gettingProjectsError,
  } = GettingProjects();

  return (
    <section>
      <h1 className="flex">
        All Projects
        {isGettingProjectsSuccess && (
          <span className="flex justify-center items-center w-[24px] h-[24px] p-2 ml-2 rounded-[50%] text-white text-[12px] bg-slate-600">
            {projects.length}
          </span>
        )}
      </h1>

      <hr className="border-[1.5px] border-slate-600 my-4" />

      <section>
        <h2 className="flex mb-4 text-green-500">
          Active
          {isGettingProjectsSuccess && (
            <span className="flex justify-center items-center w-[24px] h-[24px] p-2 ml-2 rounded-[50%] text-white text-[12px] bg-slate-600">
              {projects.length}
            </span>
          )}
        </h2>
        {isGettingProjectsSuccess &&
          projects.map((project) => (
            <ProjectsListItem key={project._id} projectData={project} />
          ))}

        {isGettingProjectsPending && <LoadingSpinner />}
      </section>

      <hr className="border-[1.5px] border-slate-600 my-4" />

      <section>
        <h2 className="mb-4 text-red-500">Closed</h2>

        {isGettingProjectsPending && <LoadingSpinner />}
      </section>

      {gettingProjectsError && <ErrMessage message={gettingProjectsError} />}
    </section>
  );
};
