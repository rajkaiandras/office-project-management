import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { monogramFormatter } from '../../utilities/monogramFormatter';

import { formatDistanceToNow } from 'date-fns';

export const DashboardProjectItem = ({ projectData }) => {
  return (
    <Link to={`/projects/${projectData._id}`}>
      <section className="w-[240px] h-[240px] p-4 border border-slate-600 m-4 rounded-md hover:text-blue-600 hover:border-blue-600">
        <h3 className="text-white truncate">{projectData.projectName}</h3>
        <ul>
          <li>
            Due date:{' '}
            {formatDistanceToNow(new Date(projectData.dueDate), {
              addSuffix: true,
            })}
          </li>
          <li className="flex gap-2">
            <span>Assigned to:</span>
            <ul className="flex gap-2">
              {projectData.assignedTo.map((assigned) => (
                <li
                  key={assigned._id}
                  className="w-[24px] h-[24px] p-2 rounded-[50%] flex justify-center items-center text-[12px] text-black bg-blue-600"
                >
                  {monogramFormatter(assigned.firstName, assigned.lastName)}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>
    </Link>
  );
};

DashboardProjectItem.propTypes = {
  projectData: PropTypes.shape({
    _id: PropTypes.string,
    projectName: PropTypes.string,
    dueDate: PropTypes.string,
    assignedTo: PropTypes.array,
  }),
};
