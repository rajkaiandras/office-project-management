import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { format, formatDistanceToNow } from 'date-fns';

import { SectionTitle } from '../../shared/components/UIElements/SectionTitle';
import { HorizontalDivider } from '../../shared/components/UIElements/HorizontalDivider';

export const ProjectPageSideNav = ({ projectData }) => {
  return (
    <aside className="col-start-1 col-end-4 row-span-1 p-4 rounded-lg bg-slate-900">
      <SectionTitle title={projectData.projectName} />

      <ul>
        <li>Category: {projectData.category}</li>
        <ul>
          <span>Assigned to: </span>
          {projectData.assignedTo.map((assigned) => (
            <li key={assigned._id} className="ml-4 text-blue-500">
              {`${assigned.firstName} ${assigned.lastName}`}
            </li>
          ))}
        </ul>
        <li>
          Due date:{' '}
          {formatDistanceToNow(new Date(projectData.dueDate), {
            addSuffix: true,
          })}
        </li>
        <li>
          Created at: {format(new Date(projectData.createdAt), 'MM/dd/yyyy')}
        </li>
      </ul>

      <HorizontalDivider />

      <Link
        className="block text-white hover:text-blue-500"
        to={`/projects/${projectData._id}`}
      >
        Issues Board
      </Link>
      {/* <Link
        className="block text-white hover:text-blue-500"
        to={`/projects/${projectData._id}/edit`}
      >
        Project Settings
      </Link> */}
    </aside>
  );
};

ProjectPageSideNav.propTypes = {
  projectData: PropTypes.shape({
    _id: PropTypes.string,
    projectName: PropTypes.string,
    dueDate: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.string,
    assignedTo: PropTypes.array,
  }),
};
