import { useOutletContext } from 'react-router-dom';

import { KanbanBoard } from './KanbanBoard';
import { UserActivityLog } from '../../users/components/UserActivityLog';
import { IssuesProgress } from './IssueProgress';
import { PageTitle } from '../../shared/components/UIElements/PageTitle';

export const ProjectPageBoard = () => {
  const projectData = useOutletContext();

  return (
    <main className="col-start-4 col-end-13 row-span-1 overflow-hidden">
      <PageTitle title={'Project Page Board'} />

      {projectData && (
        <section>
          <header className="mb-6">
            <h1 className="text-white">
              {projectData.projectName} Project Board
            </h1>
            <p>{projectData.projectDetails}</p>
          </header>

          <KanbanBoard projectData={projectData} />

          {/* <IssuesProgress projectData={projectData} /> */}

          {/* <UserActivityLog /> */}
        </section>
      )}
    </main>
  );
};
