import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Label } from './Label';

import { v4 as uuidv4 } from 'uuid';

export const AssignedIssueItem = ({ issue }) => {
  const { id, title, description, priority, labels, projectId } = issue;

  return (
    <Link to={`http://localhost:5173/projects/${projectId}`}>
      <li
        key={id}
        className="w-full p-4 rounded-md flex justify-between hover:bg-slate-700"
      >
        <section className="w-full">
          <div className="flex">
            <p className="whitespace-nowrap font-bold text-white">{title}</p>
            <ul>
              {labels.map((label) => (
                <Label key={uuidv4()} title={label} />
              ))}
            </ul>
            <p className="ml-auto text-blue-600">{priority.toUpperCase()}</p>
          </div>
          <p className="truncate">{description}</p>
        </section>
      </li>
    </Link>
  );
};

AssignedIssueItem.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    labels: PropTypes.array,
    priority: PropTypes.string,
    projectId: PropTypes.string,
  }),
};
