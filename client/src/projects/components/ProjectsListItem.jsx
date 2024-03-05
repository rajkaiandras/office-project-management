import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { format, formatDistanceToNow } from 'date-fns';

export const ProjectsListItem = ({ projectData }) => {
  return (
    <Link to={`/projects/${projectData._id}`}>
      <section className="p-4 border border-slate-600 m-4 rounded-md hover:text-blue-600 hover:border-blue-600">
        <p className="text-white">Project name: {projectData.projectName}</p>
        <p>Details: {projectData.projectDetails}</p>
        <ul>
          <li>Category: {projectData.category}</li>
          <ul>
            <span>Assigned to: </span>
            {projectData.assignedTo.map((assigned) => (
              <li key={assigned._id} className="underline inline mr-2">
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
      </section>
    </Link>
  );
};

ProjectsListItem.propTypes = {
  projectData: PropTypes.shape({
    _id: PropTypes.string,
    projectName: PropTypes.string,
    projectDetails: PropTypes.string,
    dueDate: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.string,
    assignedTo: PropTypes.array,
  }),
};
